import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function fetchJourneyTypeService(id) {

    return axiosClient.get(`/journey_types/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchJourneyTypesService() {
    return axiosClient.get(`/journey_types`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeJourneyTypeService(payload) {

    return axiosClient.post("/journey_types", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })

}
export function updateJourneyTypeService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/journey_types/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })

}
export function deleteJourneyTypeService(payload) {

    const { id, ...data } = payload
    return axiosClient.delete(`/journey_types/${id}`)
        .then(response => {
            return response.data;
        })

}

