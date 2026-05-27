// const UploadBox = ({
//     files,onFileChange,onUpload,uploading,onRemoveFile,remainingCredits,isUploadDisabled
// }) =>{
//     return(
//         <div></div>
//     )
// }

// export default UploadBox;

import { Upload, X } from "lucide-react";

const UploadBox = ({
  files,
  onFileChange,
  onUpload,
  uploading,
  onRemoveFile,
  remainingCredits,
  isUploadDisabled,
}) => {
  return (
    <div className="mx-auto max-w-3xl w-xl my-auto bg-white rounded-xl p-4 drop-shadow-2xl border border-gray-200">
      
      {/* Top Heading */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Upload className="text-blue-600" size={22} />
          <h2 className="text-xl font-semibold text-gray-800">
            Upload Files
          </h2>
        </div>

        <p className="text-sm font-semibold">
          {remainingCredits} credits remaining
        </p>
      </div>

      {/* Upload Area */}
      <label
        className={`
          border-2 border-dashed rounded-2xl
          flex flex-col items-center justify-center
          h-50 cursor-pointer transition
          ${
            isUploadDisabled
              ? "bg-gray-100 border-gray-300 cursor-not-allowed"
              : "hover:border-blue-400 border-gray-300 bg-gray-50"
          }
        `}
      >
        <input
          type="file"
          multiple
          className="hidden"
          onChange={onFileChange}
          disabled={isUploadDisabled}
        />

        {/* Upload Icon */}
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <Upload className="text-blue-600" size={30} />
        </div>

        <p className="text-xl font-medium text-gray-700">
          Drag and drop files here
        </p>

        <p className="text-gray-500 mt-2">
          or click to browse ({remainingCredits} credits remaining)
        </p>
      </label>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mt-5 space-y-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                onClick={() => onRemoveFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={18} />
              </button>
            </div>
          ))}

          {/* Upload Button */}
          <button
            onClick={onUpload}
            disabled={uploading || isUploadDisabled}
            className={`
              w-full py-3 rounded-xl text-white font-medium transition
              ${
                uploading || isUploadDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadBox;