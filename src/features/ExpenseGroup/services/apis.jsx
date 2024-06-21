import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchExpenseGroupById(id){

   return  axiosClient.get(`/expense_groups/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchExpenseGroups() {

    return axiosClient.get("/expense_groups")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}


export function storeExpenseGroup(payload) {

    return axiosClient.post("/expense_groups", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateExpenseGroup(payload) {
      const {id,...data} = payload;
    return axiosClient.put(`/expense_groups/${id}`, removeEmptyStrings(data))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}

