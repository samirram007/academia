import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchExpenseHeadById(id){

   return  axiosClient.get(`/expense_heads/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchExpenseHeads() {

    return axiosClient.get("/expense_heads")
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}


export function storeExpenseHead(payload) {

    return axiosClient.post("/expense_heads", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateExpenseHead(payload) {
      const {id,...data} = payload;
    return axiosClient.put(`/expense_heads/${id}`, removeEmptyStrings(data))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}

