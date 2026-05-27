import { FileIcon, FileText, Image, Video, Music, Globe, Lock } from "lucide-react"

const RecentFiles = ({ files }) => {
  const getFileIcon = (file) => {
    const extension = file.name?.split(".").pop()?.toLowerCase() || ""
    if (["jpg", "jpeg", "png", "svg", "gif", "webp"].includes(extension)) {
      return <Image size={18} className="text-purple-500" />
    }
    if (["mp4", "webm", "mov", "avi", "mkv"].includes(extension)) {
      return <Video size={18} className="text-blue-500" />
    }
    if (["mp3", "wav", "ogg", "flac", "m4a"].includes(extension)) {
      return <Music size={18} className="text-green-500" />
    }
    if (["pdf", "doc", "docx", "txt", "rtf"].includes(extension)) {
      return <FileText size={18} className="text-amber-500" />
    }
    return <FileIcon size={18} className="text-slate-400" />
  }

  const formatFileSize = (size = 0) => {
    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
    return `${(size / 1024 / 1024).toFixed(2)} MB`
  }

  const formatDate = (dateString) => {
    if (!dateString) return "—"
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Recent files</h2>
          <p className="text-sm text-slate-500">Your most recent uploads at a glance.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {files.length} items
        </span>
      </div>

      {files.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
          <p className="text-sm font-medium text-slate-700">No recent files available yet.</p>
          <p className="mt-2 text-sm text-slate-500">Upload files to see them listed here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  File
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Uploaded
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {files.map((file) => (
                <tr key={file.id || file.name} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100">
                        {getFileIcon(file)}
                      </div>
                      <div className="max-w-60 truncate">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-xs text-slate-500 truncate">{file.id || "#"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                    {formatFileSize(file.size)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                    {formatDate(file.uploadedAt)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {file.isPublic ? <Globe size={14} /> : <Lock size={14} />}
                      {file.isPublic ? "Public" : "Private"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default RecentFiles