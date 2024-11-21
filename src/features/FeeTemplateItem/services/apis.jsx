import axiosClient from '../../../utils/axios-client'
import { removeEmptyStrings } from '../../../utils/removeEmptyStrings';
export function  fetchFeeTemplateItemById(id){
   return  axiosClient.get(`/fee_template_items/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchFeeTemplateItem(payload) {

    return axiosClient
    .get(`/fee_template_items?fee_template_id=${payload.fee_template_id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}


export function storeFeeTemplateItem(payload) {

    return axiosClient.post("/fee_template_items", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateFeeTemplateItem(payload) {
    const {id,...data} = payload;

    return axiosClient.put(`/fee_template_items/${id}`, removeEmptyStrings(data))
    .then(response => {
         return response.data;
    })
    .catch(err => {
        throw err;
    });
}
export function deleteFeeTemplateItem(payload) {
      const {id,...data} = payload;
    return axiosClient.delete(`/fee_template_items/${id}`)
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}
