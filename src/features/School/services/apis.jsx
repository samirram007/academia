import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function  fetchSchoolByIdService(id){

   return  axiosClient.get(`/schools/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchSchoolsService() {

    return axiosClient.get("/schools")
        .then(response => {
            //console.log(response.data)
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}

export function storeSchoolService(payload) {

    return axiosClient.post("/schools", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateSchoolService(payload) {

      const {id,...data} = payload;
    return axiosClient.put(`/schools/${id}`, removeEmptyStrings(data))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        if (err.response && err.response.data) {
            throw err.response.data;
        }
        throw err;
    });
}
export function deleteSchoolService(payload) {
  // console.log(payload);
      const {id,...data} = payload;
    return axiosClient.delete(`/schools/${id}`)
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}
