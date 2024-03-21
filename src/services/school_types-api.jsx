import axiosClient from '../utils/axios-client'
export function  fetchSchoolType(id){

   return  axiosClient.get(`/school_types/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchSchoolTypes() {

    return axiosClient.get("/school_types")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

