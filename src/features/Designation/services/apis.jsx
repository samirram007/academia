import axiosClient from "../../../utils/axios-client";


export function  fetchDesignationService(id){

   return  axiosClient.get(`/designations/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchDesignationsService(payload) {

       return axiosClient.get(`/designations`)
        .then(response => {
           // console.log('fetched',response.data)
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeDesignationService(payload) {

      return axiosClient.post("/designations", payload)
      .then(response => {
          return response.data;
      })

}
export function updateDesignationService(payload) {
    console.log("Axios",payload)
const {id,...data}=payload
      return axiosClient.put(`/designations/${id}`, data)
      .then(response => {
          return response.data;
      })

}
export function deleteDesignationService(payload) {
   // console.log("Axios Deleting",payload)
const {id,...data}=payload
      return axiosClient.delete(`/designations/${id}`)
      .then(response => {
          return response.data;
      })

}

