import { Show, useAuth } from "@clerk/react"
import Landing from "../src/pages/Landing"
import { Navigate } from "react-router-dom"
import FullScreenLoader from "../src/components/FullScreenoader"

const ProtectedRoute = ({children}) => {

    const {isLoaded} = useAuth()
    if(!isLoaded)return <FullScreenLoader/>

    return (
        <>
            <Show when="signed-in">
                {children}
            </Show>
            <Show when="signed-out">
                <Navigate to='/'/>
            </Show>
        </>
    )
}

export default ProtectedRoute