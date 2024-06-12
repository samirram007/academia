import axiosClient from '../../../utils/axios-client'
import { removeEmptyStrings } from '../../../utils/removeEmptyStrings';
export function fetchTransportExpense(id) {

    return axiosClient.get(`/transport_expenses/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchTransportExpenses(payload) {
const filterString=`academic_session_id=${payload.academic_session_id}&campus_id=${payload.campus_id}&from=${payload.from}&to=${payload.to}`
// console.log(filterString);
    return axiosClient
        .get(`/transport_expenses?${filterString}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}



export function storeTransportExpense(payload) {
console.log(payload)
    return axiosClient.post("/transport_expenses", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })
        .catch(err => {

            throw err;
        });

}
export function updateTransportExpense(payload) {
    const { id, ...data } = payload;
    // console.log(id, removeEmptyStrings(data))
    return axiosClient.put(`/transport_expenses/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function deleteTransportExpense(payload) {
    const { id, ...data } = payload;
    return axiosClient.delete(`/transport_expenses/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
