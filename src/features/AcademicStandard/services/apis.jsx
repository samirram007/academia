import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchAcademicStandardService(id){

   return  axiosClient.get(`/academic_standards/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchAcademicStandardsService(payload) {

       return axiosClient.get(`/academic_standards`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeAcademicStandardService(payload) {

      return axiosClient.post("/academic_standards", removeEmptyStrings(payload))
      .then(response => {
          return response.data;
      })

}
export function updateAcademicStandardService(payload) {

const {id,...data}=payload
      return axiosClient.put(`/academic_standards/${id}`, removeEmptyStrings(data))
      .then(response => {
          return response.data;
      })

}
export function deleteAcademicStandardService(payload) {

const {id,...data}=payload
      return axiosClient.delete(`/academic_standards/${id}`)
      .then(response => {
          return response.data;
      })

}

