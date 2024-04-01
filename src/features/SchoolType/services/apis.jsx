import axiosClient from "../../../utils/axios-client";


export function  fetchSchoolType(id){

   return  axiosClient.get(`/school_types/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchSchoolTypes(payload) {

       return axiosClient.get(`/school_types`)
        .then(response => {
           // console.log('fetched',response.data)
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function fetchSchoolTypeByCampusId(campusId) {

    return axiosClient.get(`/school_types?campus_id=${campusId}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function storeSchoolType(payload) {

      return axiosClient.post("/school_types", payload)
      .then(response => {
          return response.data;
      })

}
export function updateSchoolType(payload) {
    console.log("Axios",payload)
const {id,...data}=payload
      return axiosClient.put(`/school_types/${id}`, data)
      .then(response => {
          return response.data;
      })

}
export function deleteSchoolType(payload) {
   // console.log("Axios Deleting",payload)
const {id,...data}=payload
      return axiosClient.delete(`/school_types/${id}`)
      .then(response => {
          return response.data;
      })

}

