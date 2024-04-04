import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchCampusByIdService(id){

   return  axiosClient.get(`/campuses/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export async function fetchCampusesService() {

    return await axiosClient.get("/campuses")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}

export function storeCampusService(payload) {

    return axiosClient.post("/campuses", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateCampusService(payload) {

      const {id,...data} = payload;
    return axiosClient.put(`/campuses/${id}`, removeEmptyStrings(data))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}
export function deleteCampusService(payload) {
  // console.log(payload);
      const {id,...data} = payload;
    return axiosClient.delete(`/campuses/${id}` )
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}
