import axiosClient from "../../../utils/axios-client"



export async function  authLogin(payload){
   return  (await axiosClient.post("/auth/login", payload)).data
}
export async function  authLogout(){
    return  (await axiosClient.post("/auth/logout", []))
}

