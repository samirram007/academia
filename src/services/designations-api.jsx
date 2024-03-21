import axiosClient from '../utils/axios-client'
export function  fetchDesignation(id){

   return  axiosClient.get(`/designations/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchDesignations() {

    return axiosClient.get("/designations")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

