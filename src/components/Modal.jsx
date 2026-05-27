import {  X } from "lucide-react"

const Modal = ({
    isOpen,onClose,title,children,confirmText,cancelText,onConfirm,size,confirmationButtonClass
}) =>{
    if(!isOpen)return null
    return(
        <div className="fixed drop-shadow-2xl inset-0 flex backdrop-blur-xs items-center justify-center z-50">
            <div className="bg-white  max-w-md rounded-2xl shadow-xl overflow-hidden ">
                <div className="flex items-center justify-between px-6 py-4 shadow ">
                    <h3 className="text-xl font-medium text-gray-900">
                        {title}
                    </h3>
                    <button
                    onClick={onClose}>
                        <X size={24} className="text-gray-500"/>
                    </button>
                </div>
                <div className="px-6 py-4  text-gray-900 font-medium shadow ">{children}</div>
                <div className="flex justify-end gap-4 px-6 py-4">
                    <button
                        onClick={onClose}
                        className="px-5 py-3 rounded-lg shadow bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium ">
                            {cancelText}
                    </button>
                    <button
                    onClick={onConfirm}
                    className={`px-5 py-3 rounded-lg shadow text-white font-medium transition-colors ${confirmationButtonClass}`}
                    >
                        {confirmText}
                    </button>    
                </div>
            </div>
        </div>
    )
}

export default Modal