import { Upload, X } from "lucide-react"

const DashboardUpload = ({
  files,
  onFileChange,
  onUpload,
  uploading,
  onRemoveFile,
  remainingUploads,
}) => {
  const isUploadDisabled = remainingUploads <= 0

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Upload size={22} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Upload files</h2>
            <p className="text-sm text-slate-500">
              {remainingUploads} upload slot{remainingUploads === 1 ? "" : "s"} remaining
            </p>
          </div>
        </div>
      </div>

      <label
        className={
          `block rounded-3xl border-2 border-dashed p-8 text-center transition ${
            isUploadDisabled
              ? "border-gray-300 bg-slate-100 text-slate-400 cursor-not-allowed"
              : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-white cursor-pointer"
          }`
        }
      >
        <input
          type="file"
          multiple
          className="hidden"
          onChange={onFileChange}
          disabled={isUploadDisabled}
        />
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Upload size={28} />
        </div>
        <p className="text-lg font-medium text-slate-700">Drag and drop files here</p>
        <p className="mt-2 text-sm text-slate-500">
          or click to browse files
        </p>
        {isUploadDisabled && (
          <p className="mt-3 text-sm font-semibold text-red-600">
            Upload limit reached. Remove a selected file to add another.
          </p>
        )}
      </label>

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-800">{file.name}</p>
                <p className="text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 transition hover:bg-red-50"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={onUpload}
            disabled={uploading || files.length === 0}
            className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${
              uploading || files.length === 0
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload files"}
          </button>
        </div>
      )}
    </div>
  )
}

export default DashboardUpload