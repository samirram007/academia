import axiosClient from '../utils/axios-client'
export function  fetchBuilding(id){

   return  axiosClient.get(`/buildings/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchBuildings() {

    return axiosClient.get("/buildings")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

