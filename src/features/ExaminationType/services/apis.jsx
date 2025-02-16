import axiosClient from "@/utils/axios-client";


export function fetchExaminationTypeService(id) {

    return axiosClient.get(`/examination_types/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchExaminationTypesService(payload) {

    return axiosClient.get(`/examination_types`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeExaminationTypeService(payload) {
    // console.log('payLoad', payload)
    return axiosClient.post("/examination_types", payload)
        .then(response => {
            return response.data;
        })

}
export function updateExaminationTypeService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/examination_types/${id}`, data)
        .then(response => {
            return response.data;
        })

}
export function deleteExaminationTypeService(payload) {
    const { id, ...data } = payload
    return axiosClient.delete(`/examination_types/${id}`)
        .then(response => {
            return response.data;
        })

}

