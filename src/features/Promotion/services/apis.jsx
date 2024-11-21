import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function fetchPromotionService(id) {

    return axiosClient.get(`/promotions/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchPromotionsService(payload) {
    payload = removeEmptyStrings(payload)
    let filterString = `?`
    if (payload.academic_session_id) {
        filterString += `academic_session_id=${payload.academic_session_id}`
    }
    if (payload.academic_class_id) {
        filterString += `&academic_class_id=${payload.academic_class_id}`
    }
    if (payload.section_id) {
        filterString += `&section_id=${payload.section_id}`
    }

    return axiosClient.get(`/promotions${filterString}`)
        .then(response => {

            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storePromotionService(payload) {

    return axiosClient.post("/promotions", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })

}
export function updatePromotionService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/promotions/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })

}
export function deletePromotionService(payload) {

    const { id, ...data } = payload
    return axiosClient.delete(`/promotions/${id}`)
        .then(response => {
            return response.data;
        })

}

