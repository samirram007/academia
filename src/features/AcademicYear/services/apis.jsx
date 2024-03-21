import axiosClient from "../../../utils/axios-client";


export function  fetchAcademicYear(id){

   return  axiosClient.get(`/academic_years/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchAcademicYears(payload) {

    return axiosClient.get(`/academic_years?campus_id=${payload}`)
        .then(response => {

            return response.data;
        })
        .catch(err => {

            throw err;
        });

}
export function fetchAcademicYearByCampusId(campusId) {

    return axiosClient.get(`/academic_years?campus_id=${campusId}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function storeAcademicYear(payload) {

      return axiosClient.post("/academic_years", payload)
      .then(response => {
          return response.data;
      })

}

