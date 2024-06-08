import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchAdmissionService(id){

   return  axiosClient.get(`/admissions/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchAdmissionsService(payload) {

       return axiosClient.get(`/admissions`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeAdmissionService(payload) {

      return axiosClient.post("/admissions", removeEmptyStrings(payload))
      .then(response => {
          return response.data;
      })

}
export function updateAdmissionService(payload) {

const {id,...data}=payload
      return axiosClient.put(`/admissions/${id}`, removeEmptyStrings(data))
      .then(response => {
          return response.data;
      })

}
export function deleteAdmissionService(payload) {

const {id,...data}=payload
      return axiosClient.delete(`/admissions/${id}`)
      .then(response => {
          return response.data;
      })

}

