import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchFloorService(id){

   return  axiosClient.get(`/floors/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchFloorsService(payload) {

       return axiosClient.get(`/floors?building_id=${payload.building_id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeFloorService(payload) {

      return axiosClient.post("/floors", removeEmptyStrings(payload))
      .then(response => {
          return response.data;
      })

}
export function updateFloorService(payload) {

const {id,...data}=payload
      return axiosClient.put(`/floors/${id}`, removeEmptyStrings(data))
      .then(response => {
          return response.data;
      })

}
export function deleteFloorService(payload) {

const {id,...data}=payload
      return axiosClient.delete(`/floors/${id}`)
      .then(response => {
          return response.data;
      })

}

