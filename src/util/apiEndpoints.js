// const BASE_URL="http://localhost:8080/api"
const BASE_URL="https://cloudshare-backend-production-32b6.up.railway.app"

export const apiEndpoints = {
    FETCH_FILES:`${BASE_URL}/files/my`,
    TOGGLE_FILE:(id)=>`${BASE_URL}/files/${id}/toggle-public`,
    DOWNLOAD_FILE:(id)=>`${BASE_URL}/files/download/${id}`,
    DELETE_FILE:(id)=>`${BASE_URL}/files/delete/${id}`,
    GET_CREDITS:`${BASE_URL}/users/credits`,
    UPLOAD_FILE:`${BASE_URL}/files/upload`,
    CREATE_ORDER:`${BASE_URL}/payment/create-order`,
    VERIFY_PAYMENT:`${BASE_URL}/payment/verify-payment`,
    GET_TRANSACTIONS:`${BASE_URL}/transactions`,
    GET_PUBLIC_FILE:(id)=>`${BASE_URL}/files/public/${id}`,
    GET_VIEW_URL:(id)=>`${BASE_URL}/files/view/${id}`,
}