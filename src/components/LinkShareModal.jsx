import { Copy, Link, X } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

const LinkShareModal = ({
    isOpen,onClose,link,title
}) =>{
    if(!isOpen)return null
    const [copied,setCopied] = useState(false)
    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(link)
            setCopied(true)
            toast.success("Link copied!" )
        } catch (error) {
            console.error("unable to copy link: ",error)
            toast.error("Unable to copy link: ",error.message)
        }
    }
    return(
        <div className="fixed drop-shadow-2xl inset-0 flex backdrop-blur-xs items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden ">
                <div className="flex items-center justify-between px-6 py-4 shadow">
                    <h3 className="text-xl font-medium text-gray-900">
                        {title}
                    </h3>
                    <button
                    onClick={onClose}>
                        <X size={24} className="text-gray-500"/>
                    </button>
                </div>
                <div className="px-6 py-4 space-y-5 shadow">
                    <p className="text-gray-700 text-md">Share this link with to give them access to this file:</p>
                    <div className="flex items-center gap-3 ">
                        <div className="flex-1 border mx-auto my-auto border-gray-300 rounded-xl px-4 py-3 bg-gray-50 overflow-hidden">
                            <input 
                                type="text"
                                value={link}
                                readOnly
                                className="w-full bg-transparent font-semibold outline-none text-gray-700"
                            />
                        </div>
                        <button 
                            onClick={copyLink}
                            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                        >
                            <Copy size={18} className="text-gray-700"/>
                        </button>
                    </div>
                    <p className="text-gray-700">
                        Anyone with this link can access the file.
                    </p>
                </div>
                <div className="flex justify-end gap-4 px-6 py-4">
                    <button
                        onClick={onClose}
                        className="px-5 py-3 rounded-lg shadow bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium ">
                            Close
                    </button>
                    <button
                    onClick={copyLink}
                    className={`px-5 py-3 rounded-lg shadow text-white font-medium transition-colors ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>     
                </div>
            </div>
        </div>
    )
}

export default LinkShareModal