
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

    return (  axiosClient.get(`/fees_by_student_session/${payload.student_session_id}`))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        console.log("Error: ", err);
        //throw err;
    });
}
