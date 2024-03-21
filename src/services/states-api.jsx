import axiosClient from '../utils/axios-client'
export function  fetchState(id){

   return  axiosClient.get(`/states/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchStates() {

    return axiosClient.get("/states")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

