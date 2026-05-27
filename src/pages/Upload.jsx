import { useContext, useState } from "react"
import DashboardLayout from "../layout/DashboardLayout"
import { useAuth } from "@clerk/react"
import { AlertCircle } from "lucide-react"
import axios from "axios"
import { apiEndpoints } from "../util/apiEndpoints"
import toast from "react-hot-toast"
import UploadBox from "../components/UploadBox"
import { UserCreditsContext } from "../context/UserCreditsContext"

const Upload = () => {

    const [files,setFiles] = useState([])
    const [uploading,setUploading] = useState(false)
    const [message,setMessage] = useState("")
    const [messageType,setMessageType] = useState("")
    const {getToken} = useAuth()
    const {credits,setCredits} = useContext(UserCreditsContext)
    const MAX_FILES = 5

    const handleFileChange = (e) =>{
        const selectedFiles = Array.from(e.target.files)
        if(selectedFiles.length > credits){
            setMessage("You don't have enough credits to upload.")
            setMessageType("error")
            return
        }
        setFiles((prevFiles) => [...prevFiles,...selectedFiles])
        setMessage("")
        setMessageType("")
    }

    const handleRemoveFile = (index) =>{
        setFiles((prevFiles) => prevFiles.filter((_,i) => i!=index ))
        setMessage("")
        setMessageType("")
    }

    const handleUpload = async () => {
        if(files.length===0){
            setMessage("Please select atleast one file to upload.")
            setMessageType("error")
            return
        }
        if(files.length>MAX_FILES){
            setMessage(`You can upload maximum ${MAX_FILES} files at once.`)
            setMessageType("error")
            return
        }
        setUploading(true)
        setMessage("Uploading...")
        setMessageType("info")

        const formData = new FormData()
        files.forEach((file) => formData.append("files",file))

        try {
            const token = await getToken()
            const response = await axios.post(apiEndpoints.UPLOAD_FILE,formData,{headers:{'Content-Type':"multipart/form-data" ,'Authorization':`Bearer ${token}`}})
            if(response.data && response.data["remaining credits"]!=undefined){
                setCredits(response.data["remaining credits"])
            }
            setMessage("File uploaded successfully.")
            setMessageType("success")
            setFiles([])
        } catch (error) {
            console.error("Error uploading file:",error)
            toast.error(`Error uplaoding files:${error.message}`)
            setMessage(error.response?.data?.message || "Error uploading files.")
            setMessageType("Error")
        }finally{
            setUploading(false)
        }
    }

    // console.log(files.length)
    // const isUploadDisabled = files.length ===0 || files.length > MAX_FILES || files.length >credits || credits <= 0
    const isUploadDisabled =
    files.length > MAX_FILES ||
    files.length > credits ||
    credits <= 0
 
    return(
        <DashboardLayout activeMenu="Upload">
            <div className="p-6">
                {message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType=== 'error' ? 'bg-red-50 text-red-700' : messageType==='success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                        {messageType === 'error' && <AlertCircle size={20}/>}
                        {message}
                    </div>
                )}
                <UploadBox 
                    files={files}
                    onFileChange={handleFileChange}
                    onRemoveFile={handleRemoveFile}
                    onUpload={handleUpload}
                    uploading={uploading}
                    remainingCredits={credits}
                    isUploadDisabled={isUploadDisabled}
                />
            </div>
        </DashboardLayout>
    )
}

export default Upload