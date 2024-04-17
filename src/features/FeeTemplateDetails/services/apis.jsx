import axiosClient from '../../../utils/axios-client'
import { removeEmptyStrings } from '../../../utils/removeEmptyStrings';
export function  fetchFeeTemplateDetailsById(id){
   return  axiosClient.get(`/fee_template_details/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchFeeTemplateDetails(payload) {

    return axiosClient
    .get(`/fee_template_details?fee_template_id=${payload.fee_template_id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}


export function storeFeeTemplateDetails(payload) {
    return axiosClient.post("/fee_template_details", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateFeeTemplateDetails(payload) {
    const {id,...data} = payload;

    return axiosClient.put(`/fee_template_details/${id}`, removeEmptyStrings(data))
    .then(response => {
         return response.data;
    })
    .catch(err => {
        throw err;
    });
}
export function deleteFeeTemplateDetails(payload) {
      const {id,...data} = payload;
    return axiosClient.delete(`/fee_template_details/${id}`)
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}
