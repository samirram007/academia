import axiosClient from "../../../utils/axios-client";


export function  fetchAcademicStandard(id){

   return  axiosClient.get(`/academic_standards/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchAcademicStandards() {

    return axiosClient.get("/academic_standards")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeAcademicStandard(payload) {

    return axiosClient.post("/academic_standards", payload)
    .then(response => {
        return response.data;
    })

}

