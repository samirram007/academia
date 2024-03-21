import axiosClient from '../../../utils/axios-client'
export function  fetchFeeTemplate(id){

   return  axiosClient.get(`/fee_templates/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchFeeTemplates(payload) {

    return axiosClient
    .get(`/fee_templates?academic_year_id=${payload.academic_year_id}&academic_class_id=${payload.academic_class_id}&campus_id=${payload.campus_id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}


export function storeFeeTemplate(payload) {

    return axiosClient.post("/fee_templates", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateFeeTemplate(payload) {
 //  console.log(payload);
      const {id,...data} = payload;
    return axiosClient.put(`/fee_templates/${id}`, removeEmptyStrings(data))
    .then(response => {
        console.log(response.data);
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}
