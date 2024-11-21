import axiosClient from '../../../utils/axios-client';
import { removeEmptyStrings } from '../../../utils/removeEmptyStrings';
export function fetchFee(id) {

    return axiosClient.get(`/fees/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchFees(payload) {
    const filterString = `academic_session_id=${payload.academic_session_id}&from=${payload.from}&to=${payload.to}`

    return axiosClient
        .get(`/fees?${filterString}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}



export function storeFee(payload) {

    return axiosClient.post("/fees", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })
        .catch(err => {

            throw err;
        });

}
export function updateFee(payload) {
    const { id, ...data } = payload;
    // console.log(id, removeEmptyStrings(data))
    return axiosClient.put(`/fees/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function deleteFee(payload) {


    const { id, ...data } = payload;

    return axiosClient.delete(`/fees/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
