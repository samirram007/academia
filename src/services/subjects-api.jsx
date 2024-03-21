import axiosClient from '../utils/axios-client'
export function  fetchSubject(id){

   return  axiosClient.get(`/subjects/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchSubjects() {

    return axiosClient.get("/subjects")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}

