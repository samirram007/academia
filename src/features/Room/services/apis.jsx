import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function fetchRoomService(id) {

    return axiosClient.get(`/rooms/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchRoomsService(payload) {
    // console.log(`/rooms?floor_id=${payload.floor_id}`)
    return axiosClient.get(`/rooms?floor_id=${payload.floor_id}`)
        .then(response => {
            // console.log('fetched',response.data)
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeRoomService(payload) {

    return axiosClient.post("/rooms", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })

}
export function updateRoomService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/rooms/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })

}
export function deleteRoomService(payload) {

    const { id, ...data } = payload
    return axiosClient.delete(`/rooms/${id}`)
        .then(response => {
            return response.data;
        })

}

