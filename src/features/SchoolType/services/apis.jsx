import axiosClient from "../../../utils/axios-client";


export function fetchSchoolTypeService(id) {

    return axiosClient.get(`/school_types/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchSchoolTypesService(payload) {

    return axiosClient.get(`/school_types`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeSchoolTypeService(payload) {

    return axiosClient.post("/school_types", payload)
        .then(response => {
            return response.data;
        })

}
export function updateSchoolTypeService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/school_types/${id}`, data)
        .then(response => {
            return response.data;
        })

}
export function deleteSchoolTypeService(payload) {
    const { id, ...data } = payload
    return axiosClient.delete(`/school_types/${id}`)
        .then(response => {
            return response.data;
        })

}

