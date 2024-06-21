import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchIncomeGroupById(id){

   return  axiosClient.get(`/income_groups/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchIncomeGroups() {

    return axiosClient.get("/income_groups")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}


export function storeIncomeGroup(payload) {

    return axiosClient.post("/income_groups", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateIncomeGroup(payload) {
      const {id,...data} = payload;
    return axiosClient.put(`/income_groups/${id}`, removeEmptyStrings(data))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}

