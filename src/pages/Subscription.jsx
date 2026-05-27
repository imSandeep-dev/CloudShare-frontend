import { useAuth,useUser } from "@clerk/react"
import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import DashboardLayout from "../layout/DashboardLayout"
import { apiEndpoints } from "../util/apiEndpoints"
import { AlertCircle, Check, CreditCard, IndianRupee, Loader2 } from "lucide-react"
import { UserCreditsContext } from "../context/UserCreditsContext"

const Subscription = () => {

    const [processingPayment,setProcessingPayment] = useState(false)
    const [message,setMessage] = useState("")
    const [messageType,setMessageType] = useState("")
    const [razorpayLoaded,setRazorpayLoaded] = useState(false)
    const {getToken} = useAuth()
    const {credits,fetchCredits,setCredits} = useContext(UserCreditsContext)
    const razorpayScriptRef = useRef()
    const {user} = useUser()

    const plans = [{
        id:"Premium",
        name:"Premium",
        credits:500,
        price:199,
        features:[
            "Upload up to 500 files",
            "Access to all basic features",
            "Priority support"
        ],
        recommended:false
    },{
        id:"Ultimate",
        name:"Ultimate",
        credits:5000,
        price:499,
        features:[
            "Upload up to 5000 files",
            "Access to all premium features",
            "Priority support",
            "Advanced analytics"
        ],
        recommended:true
    }]

    useEffect(()=>{
        if(!window.Razorpay){
            const script = document.createElement("script")
            script.src = "https://checkout.razorpay.com/v1/checkout.js"
            script.async = true
            script.onload = () =>{
                console.log("Razorpay script loaded")
                setRazorpayLoaded(true)
            }
            script.onerror = () =>{
                console.error("Failed to load razorpay script")
                setMessage("Failed to load payment gateway. Please try again later.")
                setMessageType("error")
            }
            document.body.appendChild(script)
            razorpayScriptRef.current = script
        }else{
            setRazorpayLoaded(true)
        }
        return() => {
            if(razorpayScriptRef.current){
                document.body.removeChild(razorpayScriptRef.current)
            }
        }
    },[])

    useEffect(() => {
        const fetchCredits = async() => {
            try{
                const token = await getToken()
                const response = await axios.get(apiEndpoints.GET_CREDITS,{headers:{'Authorization':`Bearer ${token}`}})
                setCredits(response.data.credits)
            }catch(error){
                console.error("Error fetching credits:", error)
            }
        }
        fetchCredits()
    },[getToken])

    const handlePurchase = async (plan) => {
        if(!razorpayLoaded){
            setMessage("Payment gateway is still loading. Please wait a moment and try again")
            setMessageType("error")
            return
        }
        setProcessingPayment(true)
        setMessage('')
        try {
            const token = await getToken()
            const response = await axios.post(apiEndpoints.CREATE_ORDER, {
                planId: plan.id,
                amount: plan.price * 100,
                currency: "INR",
                credits: plan.credits
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            console.log("Order created:",response.data)

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: plan.price * 100,
                currency: "INR",
                name: "CloudShare",
                description: `Purchase ${plan.credits} credits`,
                order_id: response.data.orderId,
                handler: async function (response) {
                    try {
                        const verifyResponse = await axios.post(apiEndpoints.VERIFY_PAYMENT, {
                            planId: plan.id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        }, { headers: {'Authorization' : `Bearer ${token}`} })
                        if (verifyResponse.data.success) {
                            if (verifyResponse.data.credits) {
                                setCredits(verifyResponse.data.credits)
                            } else {
                                await fetchCredits()
                            }
                            setMessage(`Payment successful! ${plan.name} is activated.`)
                            setMessageType("success")
                            fetchCredits()
                        } else {
                            setMessage("Payment verification failed. Please contact support.")
                            setMessageType("error")
                        }
                    } catch (error) {
                        console.error("Error verifying payment:", error)
                        setMessage("An error occurred while verifying the payment. Please contact support.")
                        setMessageType("error")
                    }
                },
                prefill: {
                    name: user?.fullName || "",
                    email: user?.primaryEmailAddress || ""
                },
                theme: {
                    color: "#3B82F6"
                }
            }
                if(window.Razorpay){
                    const razorpay = new window.Razorpay(options)
                    razorpay.open()
                }else{
                    throw new Error("Razorpay SDK not loaded")
                }
            }catch(error){
                console.log("Payment initiation error:",error)
                setMessage("Failed to initiate payment. Please try again.")
                setMessageType("error")
        }finally{
            setProcessingPayment(false)
        }
    }

    return(
        <DashboardLayout activeMenu="Subscription">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">Subscription Plans</h1>
                <p className="text-gray-600 mb-6">Choose the perfect plan for your needs.</p>
                {message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType === "error" ? "bg-red-50 text-red-700" : messageType === "success" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
                        {messageType === "error" && <AlertCircle size={20}/>}
                        {message}
                    </div>
                )}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard className="text-purple-500"/>
                            <h2 className="text-lg font-medium">Current Credits: <span className="font-bold text-purple-500">{credits}</span></h2>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            You can upload {credits} more files with your current credits.
                        </p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {plans.map((plan) => (
                        <div 
                        key={plan.id}
                        className={`border rounded-xl p-6 ${plan.recommended ? 'border-purple-200 bg-purple-50 shadow-md' : 'border-gray-200 bg-white'}`}>
                            {plan.recommended && (
                                <div className="inline-block bg-purple-500 text-white text-xs font-bold py-1 px-2 rounded-full ">
                                    RECOMMENDED
                                </div>
                            )}
                            <h3 className="text-xl font-bold">{plan.name}</h3>
                            <div className="mt-2 mb-4">
                                <span className="text-3xl font-bold">₹ {plan.price} </span>
                                <span className="text-gray-500">for {plan.credits} credits</span>
                            </div>
                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature,index)=>(
                                    <li key={index} className="flex items-start gap-2">
                                        <Check className="text-green-500 mt-0.5 mr-2 shrink-0" size={18} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button 
                            onClick={() => handlePurchase(plan)}
                            disabled={processingPayment}
                            className={`w-full py-2 rounded-md font-medium transition-colors ${plan.recommended ? 'bg-purple-500 hover:bg-purple-600 text-white': 'bg-white border border-purple-500 hover:bg-purple-50'}
                            disabled:opacity-50 flex items-center justify-center gap-2`}
                            >
                                {processingPayment ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin"/>
                                        <span>Processing</span>
                                    </>
                                ) : (
                                    <span>Purchase Plan</span>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-2">How credits work</h3>
                    <p className="text-sm text-gray-600">
                        Credits are used to upload files to your cloud storage. Each file uploaded consume 1 credit.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Subscription