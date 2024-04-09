import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchBuildingService(id){

   return  axiosClient.get(`/buildings/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchBuildingsService(payload) {

       return axiosClient.get(`/buildings?campus_id=${payload.campus_id}`)
        .then(response => {
            console.log('fetched',response.data)
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeBuildingService(payload) {

      return axiosClient.post("/buildings", removeEmptyStrings(payload))
      .then(response => {
          return response.data;
      })

}
export function updateBuildingService(payload) {

const {id,...data}=payload
      return axiosClient.put(`/buildings/${id}`, removeEmptyStrings(data))
      .then(response => {
          return response.data;
      })

}
export function deleteBuildingService(payload) {

const {id,...data}=payload
      return axiosClient.delete(`/buildings/${id}`)
      .then(response => {
          return response.data;
      })

}

