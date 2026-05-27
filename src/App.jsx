import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Upload from "./pages/Upload"
import Dashboard from "./pages/Dashboard"
import MyFiles from "./pages/MyFiles"
import Subscription from "./pages/Subscription"
import Transaction from "./pages/Transactions"
import { RedirectToSignIn, Show } from "@clerk/react"
import ProtectedRoute from "../routes/ProtectedRoute"
import { Toaster } from "react-hot-toast"
import PublicFileView from "./pages/PublicFileView"
import { UserCreditsProvider } from "./context/UserCreditsContext"

const App = () => {
  return (
    <UserCreditsProvider>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/dashboard" element={
          // <>
          //   <Show when="signed-in">
          //     <Dashboard/>
          //   </Show>
          //   <Show when="signed-out">
          //     <Landing/>
          //   </Show>
          // </>
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/> 
        <Route path="/upload" element={
          <ProtectedRoute>
            <Upload/>
          </ProtectedRoute>
          // <>
          //   <Show when="signed-in">
          //     <Upload/>
          //   </Show>
          //   <Show when="signed-out">
          //     <Landing/>
          //   </Show>
          // </>
        }/>
        <Route path="/my-files" element={
          // <>
          //   <Show when="signed-in">
          //     <MyFiles/>
          //   </Show>
          // <Show when="signed-out">
          //   <Landing/>
          // </Show>
          // </>
          <ProtectedRoute>
            <MyFiles/>
          </ProtectedRoute>
        }/>
        <Route path="/subscription" element={
          // <>
          //   <Show when="signed-in">
          //     <Subscription/>
          //   </Show>
          //   <Show when="signed-out">
          //     <Landing/>
          //   </Show>
          // </>
          <ProtectedRoute>
            <Subscription/>
          </ProtectedRoute>
        }/>
        <Route path="/transactions" element={
          // <>
          //   <Show when="signed-in">
          //     <Transaction/>
          //   </Show>
          //   <Show when="signed-out">
          //     <Landing/>
          //   </Show>
          // </>
          <ProtectedRoute>
            <Transaction/>
          </ProtectedRoute>
        }/>
        <Route path="file/:fileId" element={
          <>
            <PublicFileView />
          </>
        } />
        <Route path="/*" element={<Landing/>}/>
      </Routes>
    </BrowserRouter>
    </UserCreditsProvider>
  )
}

export default App