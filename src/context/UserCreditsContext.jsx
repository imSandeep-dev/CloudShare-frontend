import { useAuth } from "@clerk/react";
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { apiEndpoints } from "../util/apiEndpoints";

export const UserCreditsContext = createContext()

export const UserCreditsProvider = ({children}) => {
    const [credits,setCredits] = useState(5)
    const [loading,setLoading] = useState(false)
    const {getToken,isSignedIn} = useAuth()

    const fetchCredits = useCallback(async() => {
        if(!isSignedIn)return
        setLoading(true)
        try {
            const token = await getToken()
            const response = await axios.get(apiEndpoints.GET_CREDITS,{headers: {'Authorization' : `Bearer ${token}`}})
            if(response.status===200){
                setCredits(response.data.credits)
            }else{
                toast.error("Unable to fetch credits.")
            }
        } catch (error) {
            console.error("Error fetching the user credist: ",error)
        }finally{
            setLoading(false)
        }
    },[getToken,isSignedIn])

    useEffect(() => {
        if(isSignedIn){
            fetchCredits()
        }
    },[fetchCredits,isSignedIn])

    const updateCredits = useCallback(newCredits => {
        console.log("updating credits",newCredits)
        setCredits(newCredits)
    },[])

    const contextValue = {
        credits,setCredits,fetchCredits,updateCredits
    }

    return(
        <UserCreditsContext.Provider value={contextValue}>
            {children}
        </UserCreditsContext.Provider>
    )
}