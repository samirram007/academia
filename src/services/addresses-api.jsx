import axiosClient from '../utils/axios-client'
export function  fetchAddress(id){

   return  axiosClient.get(`/addresses/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchAddresses() {

    return axiosClient.get("/addresses")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

