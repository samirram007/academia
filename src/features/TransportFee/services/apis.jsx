import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function fetchTransportFeeService(id) {

    return axiosClient.get(`/transport_fees/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchTransportFeesService(payload) {
    const filterString = `academic_session_id=${payload.academic_session_id}&from=${payload.from}&to=${payload.to}`

    return axiosClient.get(`/transport_fees?${filterString}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeTransportFeeService(payload) {

    return axiosClient.post("/transport_fees", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })

}
export function updateTransportFeeService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/transport_fees/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })

}
export function deleteTransportFeeService(payload) {

    const { id, ...data } = payload
    return axiosClient.delete(`/transport_fees/${id}`)
        .then(response => {
            return response.data;
        })

}

