import axiosClient from "../../../utils/axios-client";


export function  fetchAcademicClassService(id){

   return  axiosClient.get(`/academic_classes/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchAcademicClassServices(payload) {

       return axiosClient.get(`/academic_classes?campus_id=${payload.campus_id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function fetchAcademicClassByCampusIdService(campusId) {

    return axiosClient.get(`/academic_classes?campus_id=${campusId}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function storeAcademicClassService(payload) {

      return axiosClient.post("/academic_classes", payload)
      .then(response => {
          return response.data;
      })

}
export function updateAcademicClassService(payload) {
console.log(payload)
const {id,...data}=payload
      return axiosClient.put(`/academic_classes/${id}`, data)
      .then(response => {
          return response.data;
      })

}
export function deleteAcademicClassService(payload) {

const {id,...data}=payload
      return axiosClient.delete(`/academic_classes/${id}`)
      .then(response => {
          return response.data;
      })

}

