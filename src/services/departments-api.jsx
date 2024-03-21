import axiosClient from '../utils/axios-client'
export function  fetchDepartment(id){

   return  axiosClient.get(`/departments/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchDepartments() {

    return axiosClient.get("/departments")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

