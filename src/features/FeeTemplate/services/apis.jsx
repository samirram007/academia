import axiosClient from '../../../utils/axios-client'
import { removeEmptyStrings } from '../../../utils/removeEmptyStrings';
export function fetchFeeTemplate(id) {

    return axiosClient.get(`/fee_templates/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchFeeTemplates(payload) {

    return axiosClient
        .get(`/fee_templates?academic_session_id=${payload.academic_session_id}&academic_class_id=${payload.academic_class_id}&campus_id=${payload.campus_id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}



export function storeFeeTemplate(payload) {

    return axiosClient.post("/fee_templates", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })
        .catch(err => {

            throw err;
        });

}
export function updateFeeTemplate(payload) {
    const { id, ...data } = payload;
    return axiosClient.put(`/fee_templates/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function deleteFeeTemplate(payload) {
    const { id, ...data } = payload;
    return axiosClient.delete(`/fee_templates/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
