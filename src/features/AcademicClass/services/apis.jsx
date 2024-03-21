import axiosClient from "../../../utils/axios-client";


export function  fetchAcademicClass(id){

   return  axiosClient.get(`/academic_classes/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchAcademicClasses(payload) {

    return axiosClient.get(`/academic_classes?campus_id=${payload}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeAcademicClass(payload) {

    return axiosClient.post("/academic_classes", payload)
    .then(response => {
        return response.data;
    })

}
