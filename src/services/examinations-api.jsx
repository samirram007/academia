import axiosClient from '../utils/axios-client'
export function  fetchExamination(id){

   return  axiosClient.get(`/examinations/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchExaminations() {

    return axiosClient.get("/examinations")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

