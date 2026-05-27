import { Loader2 } from "lucide-react"

const FullScreenLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center text-xl">
      <Loader2 size={48} className="animate-spin text-purple-500"/>
      Loading...
    </div>
  )
}

export default FullScreenLoader