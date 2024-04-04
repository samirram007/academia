import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchSectionService(id){

   return  axiosClient.get(`/sections/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchSectionsService(payload) {

       return axiosClient.get(`/sections`)
        .then(response => {
           // console.log('fetched',response.data)
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeSectionService(payload) {

      return axiosClient.post("/sections", removeEmptyStrings(payload))
      .then(response => {
          return response.data;
      })

}
export function updateSectionService(payload) {

const {id,...data}=payload
      return axiosClient.put(`/sections/${id}`, removeEmptyStrings(data))
      .then(response => {
          return response.data;
      })

}
export function deleteSectionService(payload) {

const {id,...data}=payload
      return axiosClient.delete(`/sections/${id}`)
      .then(response => {
          return response.data;
      })

}

