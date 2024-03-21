import axiosClient from '../utils/axios-client'
export function  fetchTerm(id){

   return  axiosClient.get(`/terms/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchTerms() {

    return axiosClient.get("/terms")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

