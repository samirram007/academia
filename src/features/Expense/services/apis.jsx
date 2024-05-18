import axiosClient from '../../../utils/axios-client'
import { removeEmptyStrings } from '../../../utils/removeEmptyStrings';
export function fetchExpense(id) {

    return axiosClient.get(`/expenses/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchExpenses(payload) {

    return axiosClient
        .get(`/expenses?academic_session_id=${payload.academic_session_id}&academic_class_id=${payload.academic_class_id}&campus_id=${payload.campus_id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}



export function storeExpense(payload) {

    return axiosClient.post("/expenses", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })
        .catch(err => {

            throw err;
        });

}
export function updateExpense(payload) {
    const { id, ...data } = payload;
    return axiosClient.put(`/expenses/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function deleteExpense(payload) {
    const { id, ...data } = payload;
    return axiosClient.delete(`/expenses/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
