
import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";

export  function fetchStudentSessionsByStudentId(payload) {
    return (  axiosClient.get(`/student_sessions_by_student_id/${payload.student_id}`))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        console.log("Error: ", err);
        //throw err;
    });
}
export  function fetchStudentSessionsFeesByStudentSessionId(payload) {
    console.log(payload.student_session_id);

    return (  axiosClient.get(`/fees_by_student_session/${payload.student_session_id}`))
    .then(response => {
        console.log(response.data);
        return response.data;
    })
    .catch(err => {
        console.log("Error: ", err);
        //throw err;
    });
}
export  function fetchGenerateRollNo(payload) {


    // console.log(`/student_sessions?${payload}`)
    payload = removeEmptyStrings(payload)
    //console.log(payload)
    let filterString = `campus_id=${payload.campus_id}`
    if (payload.filter_option) {
        filterString += `&filter_option=${payload.filter_option}`
    }
    if (payload.academic_session_id) {
        filterString += `&academic_session_id=${payload.academic_session_id}`
    }
    if (payload.academic_class_id) {
        filterString += `&academic_class_id=${payload.academic_class_id}`
    }
    if (payload.section_id) {
        filterString += `&section_id=${payload.section_id}`
    }

    //console.log(filterString);
    return (  axiosClient.get(`/student_sessions_generate_roll_no?${filterString}`))
    .then(response => {
       // console.log(response);
        return response.data;
    })
    .catch(err => {
        console.log("Error: ", err);
        //throw err;
    });
}


export function storeEnrollment(payload) {

    return axiosClient.post("/student_sessions/enrollment", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}
export function updateEnrollment(payload) {
    const { id, ...data } = payload;
    return axiosClient.put(`/student_sessions/enrollment/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}