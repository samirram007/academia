import axiosClient from "@/utils/axios-client";


export function fetchExaminationService(id) {

    return axiosClient.get(`/examination/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchExaminationsService(payload) {

    return axiosClient.get(`/examination`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeExaminationService(payload) {

    return axiosClient.post("/examination", payload)
        .then(response => {
            return response.data;
        })

}
export function updateExaminationService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/examination/${id}`, data)
        .then(response => {
            return response.data;
        })

}
export function deleteExaminationService(payload) {
    const { id, ...data } = payload
    return axiosClient.delete(`/examination/${id}`)
        .then(response => {
            return response.data;
        })

}

