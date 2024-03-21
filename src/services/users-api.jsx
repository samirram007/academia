import axiosClient from '../utils/axios-client'
export async function  fetchUser(){

   return  (await axiosClient.get("/user")).data
}
export async function fetchUsers() {
    return (await axiosClient.get("/users")).data
}

