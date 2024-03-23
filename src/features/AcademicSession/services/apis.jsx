import axiosClient from "../../../utils/axios-client";


export function  fetchAcademicSession(id){

   return  axiosClient.get(`/academic_sessions/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchAcademicSessions(payload) {
    console.log('fetchAcademicSessions',payload)
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

