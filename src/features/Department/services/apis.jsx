import axiosClient from "../../../utils/axios-client";


export function  fetchDepartmentService(id){

   return  axiosClient.get(`/departments/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchDepartmentsService(payload) {

       return axiosClient.get(`/departments`)
        .then(response => {
           // console.log('fetched',response.data)
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeDepartmentService(payload) {

      return axiosClient.post("/departments", payload)
      .then(response => {
          return response.data;
      })

}
export function updateDepartmentService(payload) {
    console.log("Axios",payload)
const {id,...data}=payload
      return axiosClient.put(`/departments/${id}`, data)
      .then(response => {
          return response.data;
      })

}
export function deleteDepartmentService(payload) {
   // console.log("Axios Deleting",payload)
const {id,...data}=payload
      return axiosClient.delete(`/departments/${id}`)
      .then(response => {
          return response.data;
      })

}

