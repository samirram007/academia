import axiosClient from "../../../utils/axios-client";


export function fetchAcademicSessionService(id) {

    return axiosClient.get(`/academic_sessions/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchAcademicSessionServices(payload) {

    return axiosClient.get(`/academic_sessions`)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function fetchAcademicSessionByCampusIdService(campusId) {

    return axiosClient.get(`/academic_sessions?campus_id=${campusId}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function storeAcademicSessionService(payload) {

    return axiosClient.post("/academic_sessions", payload)
        .then(response => {
            return response.data;
        })

}
export function updateAcademicSessionService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/academic_sessions/${id}`, data)
        .then(response => {
            return response.data;
        })

}
export function deleteAcademicSessionService(payload) {
    const { id, ...data } = payload
    return axiosClient.delete(`/academic_sessions/${id}`)
        .then(response => {
            return response.data;
        })

}

