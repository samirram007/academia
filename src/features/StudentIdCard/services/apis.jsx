import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";


export function fetchStudentIdCardService(id) {

    return axiosClient.get(`/student_id_cards/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchStudentIdCardsService(payload) {
    // console.log(`/student_sessions?${payload}`)
    payload = removeEmptyStrings(payload)
    //console.log(payload)
    let filterString = `campus_id=${payload.campus_id}`
    // if (payload.filter_option) {
    //     filterString += `&filter_option=${payload.filter_option}`
    // }
    if (payload.academic_session_id) {
        filterString += `&academic_session_id=${payload.academic_session_id}`
    }
    if (payload.academic_class_id) {
        filterString += `&academic_class_id=${payload.academic_class_id}`
    }
    if (payload.section_id) {
        filterString += `&section_id=${payload.section_id}`
    }
    return axiosClient.get(`/student_id_cards?${filterString}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeStudentIdCardService(payload) {
    console.log(payload);
    return axiosClient.post("/student_id_cards", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })

}
export function updateStudentIdCardService(payload) {

    const { id, ...data } = payload
    return axiosClient.put(`/student_id_cards/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })

}
export function deleteStudentIdCardService(payload) {

    const { id, ...data } = payload
    return axiosClient.delete(`/student_id_cards/${id}`)
        .then(response => {
            return response.data;
        })

}

