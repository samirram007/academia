import axios from "axios";
import { toast } from "react-toastify";



const BASE_URL = import.meta.env.VITE_API_BASE_URL

//console.clear()
const axiosClient = axios.create({
    baseURL: `${BASE_URL}/api`
})
// let ApiCallCount=0
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`; // set in header

    return config;
},
    (error) => {
        return Promise.reject(error);
    }
)

axiosClient.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        toast.error(error.response.data.message)
        const originalRequest = error.config;

        //   console.log(originalRequest._retry);

        const originalResponse = error.response
        // if ([401, 403].includes(error.response.status) && !originalResponse._retry) {
        if (
            (originalResponse?.data?.access_denied_reason?.includes("Expired") ||
                originalResponse?.data?.message?.includes("Unauthenticated.")) &&
            originalResponse?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('REFRESH_TOKEN');

            if (refreshToken) {
                try {
                    // console.log("NOOR", refreshToken)
                    const response = await axios.post(`${BASE_URL}/api/auth/refresh`,
                        {
                            'Authorization': `Bearer ${refreshToken}`
                        }

                    );

                    // don't use axious instance that already configured for refresh token api call
                    const newAccessToken = response.data.token;
                    const newRefreshToken = response.data.refreshToken;

                    localStorage.setItem('ACCESS_TOKEN', newAccessToken);  //set new access token
                    localStorage.setItem('REFRESH_TOKEN', newRefreshToken);  //set new Refresh token

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    //  console.clear()
                    return axios(originalRequest); //recall Api with new token
                } catch (error) {
                    console.log("Must Nou Be Here..", error);
                    localStorage.removeItem('ACCESS_TOKEN')
                    localStorage.removeItem('REFRESH_TOKEN')
                    toast.error("Something went wrong")
                    // const navigate=useNavigate()
                    // navigate('/auth/login')
                    window.location.href = '/login';
                }

            }
            localStorage.removeItem('ACCESS_TOKEN')
            localStorage.removeItem('REFRESH_TOKEN')

            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
)


export default axiosClient;
