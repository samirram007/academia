import axios from "axios"

//console.clear()
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})
let ApiCallCount=0
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    // config.headers.Accept=`application/json`
    // config.headers["Content-Type"]=`application/json`

    console.log("Api Call Count: ",config.url,ApiCallCount++);
    return config
})


axiosClient.interceptors.response.use((response) => {
    console.log("Response: ",response);
    return response
},
    (error) => {
        try {

            const { response } = error

            if (response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN')
            }
        } catch (e) {
            console.log(e);

        }
        throw error;
    })
export default axiosClient;
