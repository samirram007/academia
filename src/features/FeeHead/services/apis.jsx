import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchFeeHeadById(id){

   return  axiosClient.get(`/fee_heads/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchFeeHeads() {

    return axiosClient.get("/fee_heads")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}


export function storeFeeHead(payload) {

    return axiosClient.post("/fee_heads", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateFeeHead(payload) {
      const {id,...data} = payload;
    return axiosClient.put(`/fee_heads/${id}`, removeEmptyStrings(payload))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}

