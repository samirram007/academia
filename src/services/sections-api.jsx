import axiosClient from '../utils/axios-client'
export function  fetchSection(id){

   return  axiosClient.get(`/sections/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchSections() {

    return axiosClient.get("/sections")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

