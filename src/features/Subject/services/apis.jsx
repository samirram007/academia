import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchSubjectService(id){

   return  axiosClient.get(`/subjects/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchSubjectsService(payload) {

       return axiosClient.get(`/subjects?academic_standard_id=${payload.academic_standard_id}&subject_group_id=${payload.subject_group_id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeSubjectService(payload) {

      return axiosClient.post("/subjects", removeEmptyStrings(payload))
      .then(response => {
          return response.data;
      })

}
export function updateSubjectService(payload) {

const {id,...data}=payload

      return axiosClient.put(`/subjects/${id}`, removeEmptyStrings(data))
      .then(response => {
          return response.data;
      })

}
export function deleteSubjectService(payload) {

const {id,...data}=payload
      return axiosClient.delete(`/subjects/${id}`)
      .then(response => {
          return response.data;
      })

}

