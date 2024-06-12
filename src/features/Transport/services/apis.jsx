import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function fetchTransportService(id) {

    return axiosClient.get(`/transports/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchTransportsService() {
    return axiosClient.get(`/transports`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeTransportService(payload) {

    return axiosClient.post("/transports", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })

}
export function updateTransportService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/transports/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })

}
export function deleteTransportService(payload) {

    const { id, ...data } = payload
    return axiosClient.delete(`/transports/${id}`)
        .then(response => {
            return response.data;
        })

}

