import axiosClient from '../../../utils/axios-client';
import { removeEmptyStrings } from '../../../utils/removeEmptyStrings';
export function fetchExpense(id) {

    return axiosClient.get(`/expenses/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchExpenses(payload) {
    const filterString = `academic_session_id=${payload.academic_session_id}&from=${payload.from}&to=${payload.to}`

    return axiosClient
        .get(`/expenses?${filterString}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}



export function storeExpense(payload) {
    //console.log(removeEmptyStrings(payload))
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
    //console.log(id, removeEmptyStrings(data))
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
