import axiosClient from '../utils/axios-client'
export function  fetchPeriod(id){

   return  axiosClient.get(`/periods/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchPeriods() {

    return axiosClient.get("/periods")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

