import axiosClient from '../utils/axios-client'
export function  fetchFee(id){

   return  axiosClient.get(`/fees/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchFees() {

    return axiosClient.get("/fees")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

