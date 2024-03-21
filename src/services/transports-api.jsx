import axiosClient from '../utils/axios-client'
export function  fetchTransport(id){

   return  axiosClient.get(`/transports/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchTransports() {

    return axiosClient.get("/transports")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

