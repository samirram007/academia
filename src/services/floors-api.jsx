import axiosClient from '../utils/axios-client'
export function  fetchFloor(id){

   return  axiosClient.get(`/floors/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchFloors() {

    return axiosClient.get("/floors")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

