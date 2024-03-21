import axiosClient from '../utils/axios-client'
export function  fetchAttendance(id){

   return  axiosClient.get(`/attendances/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchAttendances() {

    return axiosClient.get("/attendances")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

