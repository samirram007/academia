import axiosClient from "../../../utils/axios-client";


export function  fetchAcademicSession(id){

   return  axiosClient.get(`/academic_sessions/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchAcademicSessions(payload) {

       return axiosClient.get(`/academic_sessions?campus_id=${payload.campus_id}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function fetchAcademicSessionByCampusId(campusId) {

    return axiosClient.get(`/academic_sessions?campus_id=${campusId}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function storeAcademicSession(payload) {

      return axiosClient.post("/academic_sessions", payload)
      .then(response => {
          return response.data;
      })

}
export function updateAcademicSession(payload) {
    console.log("Axios",payload)
const {id,...data}=payload
      return axiosClient.put(`/academic_sessions/${id}`, data)
      .then(response => {
          return response.data;
      })

}
export function deleteAcademicSession(payload) {
   // console.log("Axios Deleting",payload)
const {id,...data}=payload
      return axiosClient.delete(`/academic_sessions/${id}`)
      .then(response => {
          return response.data;
      })

}

