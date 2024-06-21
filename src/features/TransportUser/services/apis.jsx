import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function fetchTransportUserService(id) {

    return axiosClient.get(`/transport_users/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchTransportUsersService(payload) {
    const filterString=payload.transport_id?`?transport_id=${payload.transport_id}`:``
    //console.log(filterString)
    return axiosClient.get(`/transport_users${filterString}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function fetchUserSearchService(payload) {
    const filterString=payload.searchText?`?search_text=${payload.searchText}`:``
     console.log(filterString)
    return axiosClient.get(`/search_users_for_transport${filterString}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function fetchTransportUserSearchService(payload) {
    const filterString=payload.searchText?`?search_text=${payload.searchText}`:``
   //  console.log(filterString)
    return axiosClient.get(`/search_transport_users_for_fees${filterString}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeTransportUserService(payload) {
console.log('api',payload)
// return
    return axiosClient.post("/transport_users", removeEmptyStrings(payload))
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(err=> {console.log('error', err)})

}
export function updateTransportUserService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/transport_users/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })

}
export function deleteTransportUserService(payload) {

    const { id, ...data } = payload
    return axiosClient.delete(`/transport_users/${id}`)
        .then(response => {
            return response.data;
        })

}

