import { useContext, useEffect, useState } from "react"
import DashboardLayout from "../layout/DashboardLayout"
import { useAuth } from "@clerk/react"
import axios from "axios"
import { apiEndpoints } from "../util/apiEndpoints"
import DashboardUpload from "../components/DashboardUpload"
import RecentFiles from "../components/RecentFiles"
import { Loader2 } from "lucide-react"
import { UserCreditsContext } from "../context/UserCreditsContext"

const Dashboard = () => {
    const {getToken} = useAuth()
    const [files,setFiles] = useState([])
    const [loading,setLoading]=useState(false)
    const [uploadFiles,setUploadFiles] = useState([])
    const [uploading,setUploading]=useState(false)
    const [message,setMessage] = useState("")
    const [messageType,setMessageType] = useState("")
    const [remainingUploads,setRemainingUploads] = useState(5)
    const {fetchCredits}= useContext(UserCreditsContext)
    const MAX_FILES = 5

    useEffect(() => {
        const fetchRecentFiles = async () => {
            setLoading(true)
            try {
                const token = await getToken()
                const response = await axios.get(apiEndpoints.FETCH_FILES,{headers:{'Authorization':`Bearer ${token}`}})
                const sortedFiles = response.data.sort((a,b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)).slice(0,5)
                setFiles(sortedFiles)
            } catch (error) {
                console.error("Error fetching recent files:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchRecentFiles()
    },[getToken])

    const handleFileChange = (e) =>{
        const selectedFiles = Array.from(e.target.files)
        if(uploadFiles.length +selectedFiles.length > MAX_FILES){
            setMessage("You can only upload up to 5 files at a time.")
            setMessageType("error")
            return
        }
        setUploadFiles((prevFiles) => [...prevFiles,...selectedFiles])
        setMessage("")
        setMessageType("")
    }

    const handleRemoveFile = (index) =>{
        setUploadFiles((prevFiles) => prevFiles.filter((_,i) => i!=index ))
        setMessage("")
        setMessageType("")
    }

    useEffect(() => {
        setRemainingUploads(MAX_FILES - uploadFiles.length)
    },[uploadFiles])

    const handleUpload = async () => {
        if(uploadFiles.length === 0){
            setMessage("Please select at least one file to upload.")
            setMessageType("error")
            return
        }
        if(uploadFiles.length > MAX_FILES){
            setMessage(`You can upload a maximum of ${MAX_FILES} files at once.`)
            setMessageType("error")
            return
        }
        setUploading(true)
        setMessage("Uploading...")
        setMessageType("info")

        const formData = new FormData()
        uploadFiles.forEach((file) => formData.append("files", file))

        try {
            const token = await getToken()
            await axios.post(apiEndpoints.UPLOAD_FILE, formData, {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'Authorization': `Bearer ${token}`,
                },
            })

            setMessage("Files uploaded successfully.")
            setMessageType("success")
            setUploadFiles([])

            const res = await axios.get(apiEndpoints.FETCH_FILES, {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            const sortedFiles = res.data.sort((a,b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)).slice(0,5)
            setFiles(sortedFiles)
            await fetchCredits()
        } catch (error) {
            console.error("Error uploading file:", error)
            setMessage(error.response?.data?.message || `Error uploading files: ${error.message}`)
            setMessageType("error")
        } finally {
            setUploading(false)
        }
    }

    return(
        <DashboardLayout activeMenu="Dashboard">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">My Drive</h1>
                <p className="text-gray-600 mb-6">Upload, manage, and share your files securely</p>
                {message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                        messageType=== 'error' ? 'bg-red-50 text-red-700' :
                         messageType==='success' ? 'bg-green-50 text-green-700' :
                          'bg-blue-50 text-blue-700'}`}>
                        {/* {messageType === 'error' && <AlertCircle size={20}/>} */}
                        {message}
                    </div>
                )}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-[40%]">
                        <DashboardUpload 
                            files = {uploadFiles}
                            onFileChange={handleFileChange}
                            onUpload={handleUpload}
                            onRemoveFile={handleRemoveFile}
                            uploading={uploading}
                            remainingUploads={remainingUploads}
                        />
                    </div>
                    <div className="w-full md:w-[60%]">
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <Loader2 size={24} className="text-purple-500 animate-spin mr-2" />
                                <p className="text-gray-500">Loading your files...</p>
                            </div>
                        ):(
                            <RecentFiles files={files} />
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard