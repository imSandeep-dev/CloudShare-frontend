import { useEffect, useState } from "react"
import DashboardLayout from "../layout/DashboardLayout"
import { useAuth } from "@clerk/react"
import axios from "axios"
import { apiEndpoints } from "../util/apiEndpoints"
import { AlertCircle, Loader2, Receipt } from "lucide-react"

const Transaction = () => {
    
    const [transactions, setTransactions] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const { getToken } = useAuth()

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true)
                const token = await getToken()
                const response = await axios.get(apiEndpoints.GET_TRANSACTIONS, { headers: {'Authorization' : `Bearer ${token}`}})
                setTransactions(response.data)
                setError(null)
            } catch (error) {
                setError("Failed to fetch transactions. Please try again.")
            }finally{
                setLoading(false)
            }
        }
        fetchTransactions()
    },[getToken])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'}
        return new Date(dateString).toLocaleDateString(undefined,options)
    }

    return(
        <DashboardLayout activeMenu="Transactions">
            <div className="p-6">
                <div className="flex items-center mb-6 gap-2">
                    <Receipt className="text-blue-600"/>
                    <h1 className="text-2xl font-bold">Transaction History</h1>
                </div>
                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center justify-center">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 size={24} className="animate-spin mr-2" />
                        <span>Loading transactions...</span>
                    </div>
                ) : (
                    transactions.length ===0 ? (
                        <div className="bg-gray-50 p-8 rounded-lg text-center">
                            <Receipt size={48} className="mx-auto mb-4 text-gray-400"/>
                            <h2 className="text-lg font-medium text-gray-700 mb-2">No Transactions Yet</h2>
                            <p className="text-gray-500">You haven't made any transactions yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-auto">
                            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                                <thead>
                                    <tr >
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider ">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider ">
                                            Plan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider ">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider ">
                                            Credits Purchased
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider ">
                                            Payment Id
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divided-y divide-gray-200">
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {formatDate(transaction.transactionDate)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {transaction.planId} Plan
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {transaction.amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {transaction.creditsAdded}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {transaction.paymentId.substring(0,10)}...
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                )}
            </div>
        </DashboardLayout>
    )
}


export default Transaction