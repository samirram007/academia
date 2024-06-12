import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function fetchTransportTypeService(id) {

    return axiosClient.get(`/transport_types/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchTransportTypesService() {
    return axiosClient.get(`/transport_types`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeTransportTypeService(payload) {

    return axiosClient.post("/transport_types", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })

}
export function updateTransportTypeService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/transport_types/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })

}
export function deleteTransportTypeService(payload) {

    const { id, ...data } = payload
    return axiosClient.delete(`/transport_types/${id}`)
        .then(response => {
            return response.data;
        })

}

