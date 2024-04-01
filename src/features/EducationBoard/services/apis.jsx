import axiosClient from "../../../utils/axios-client";


export function  fetchEducationBoard(id){

   return  axiosClient.get(`/education_boards/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchEducationBoards(payload) {

       return axiosClient.get(`/education_boards`)
        .then(response => {
           // console.log('fetched',response.data)
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function fetchEducationBoardByCampusId(campusId) {

    return axiosClient.get(`/education_boards`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function storeEducationBoard(payload) {

      return axiosClient.post("/education_boards", payload)
      .then(response => {
          return response.data;
      })

}
export function updateEducationBoard(payload) {
    console.log("Axios",payload)
const {id,...data}=payload
      return axiosClient.put(`/education_boards/${id}`, data)
      .then(response => {
          return response.data;
      })

}
export function deleteEducationBoard(payload) {
   // console.log("Axios Deleting",payload)
const {id,...data}=payload
      return axiosClient.delete(`/education_boards/${id}`)
      .then(response => {
          return response.data;
      })

}

