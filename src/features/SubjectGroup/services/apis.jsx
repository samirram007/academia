import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchSubjectGroupService(id){

   return  axiosClient.get(`/subject_groups/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchSubjectGroupsService(payload) {

       return axiosClient.get(`/subject_groups`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeSubjectGroupService(payload) {

      return axiosClient.post("/subject_groups", removeEmptyStrings(payload))
      .then(response => {
          return response.data;
      })

}
export function updateSubjectGroupService(payload) {

const {id,...data}=payload
      return axiosClient.put(`/subject_groups/${id}`, removeEmptyStrings(data))
      .then(response => {
          return response.data;
      })

}
export function deleteSubjectGroupService(payload) {

const {id,...data}=payload
      return axiosClient.delete(`/subject_groups/${id}`)
      .then(response => {
          return response.data;
      })

}

