import axiosClient from '../../../utils/axios-client';
import { removeEmptyStrings } from '../../../utils/removeEmptyStrings';


const apiModulePath = '/examination_types'
export function fetchExaminationType(id) {

    return axiosClient.get(`${apiModulePath}/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchExaminationTypes(payload) {
    const filterString = `academic_session_id=${payload.academic_session_id}&from=${payload.from}&to=${payload.to}`

    return axiosClient
        .get(`${apiModulePath}?${filterString}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}



export function storeExaminationType(payload) {
    //console.log(removeEmptyStrings(payload))
    return axiosClient.post(`${apiModulePath}`, removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })
        .catch(err => {

            throw err;
        });

}
export function updateExaminationType(payload) {
    const { id, ...data } = payload;
    //console.log(id, removeEmptyStrings(data))
    return axiosClient.put(`${apiModulePath}/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function deleteExaminationType(payload) {
    const { id, ...data } = payload;
    return axiosClient.delete(`${apiModulePath}/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
