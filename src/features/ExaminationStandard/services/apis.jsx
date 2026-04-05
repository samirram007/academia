import axiosClient from "@/utils/axios-client";


export function fetchExaminationStandardService(id) {

    return axiosClient.get(`/examination_standard/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchExaminationStandardsService(payload) {

    return axiosClient.get(`/examination_standard`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeExaminationStandardService(payload) {

    return axiosClient.post("/examination_standard", payload)
        .then(response => {
            return response.data;
        })

}
export function updateExaminationStandardService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/examination_standard/${id}`, data)
        .then(response => {
            return response.data;
        })

}
export function deleteExaminationStandardService(payload) {
    const { id, ...data } = payload
    return axiosClient.delete(`/examination_standard/${id}`)
        .then(response => {
            return response.data;
        })

}

