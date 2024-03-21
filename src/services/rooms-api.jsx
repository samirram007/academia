import axiosClient from '../utils/axios-client'
export function  fetchRoom(id){

   return  axiosClient.get(`/rooms/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchRooms() {

    return axiosClient.get("/rooms")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

