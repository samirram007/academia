import axiosClient from '../utils/axios-client'
export function  fetchCampus(id){

   return  axiosClient.get(`/campuses/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchCampuses() {

    return axiosClient.get("/campuses")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

