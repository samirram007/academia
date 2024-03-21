import axiosClient from '../utils/axios-client'
export function  fetchEducationBoard(id){

   return  axiosClient.get(`/education_boards/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchEducationBoards() {

    return axiosClient.get("/education_boards")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

