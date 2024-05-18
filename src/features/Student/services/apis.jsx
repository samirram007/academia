import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";

export  function fetchStudents(payload) {
    console.log(payload)
   // console.log(`/student_sessions?${payload}`)
    return ( axiosClient.get(`/student_sessions?campus_id=${payload.campus_id}&academic_class_id=${payload.academic_class_id}&academic_session_id=${payload.academic_session_id}`))
    .then(response => {
       // console.log(response.data)
        return response.data;
    })
    .catch(err => {

         throw err;
    });
}
export async function fetchStudentById(id) {
    return (await axiosClient.get(`/student_sessions/${id}`)).data
}
export function storeStudent(payload) {

    return axiosClient.post("/users", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function storeStudentFee(payload) {
//  console.log(removeEmptyStrings(payload));
    return axiosClient.post("/fees", removeEmptyStrings(payload))
    .then(response => {
        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateStudentFee(payload) {
    const {id,...data} = payload;
    //console.log(removeEmptyStrings(data));
    return axiosClient.put(`/fees/${id}`, removeEmptyStrings(data))
    .then(response => {
        console.log("Response",response.data);
        return response.data;
    })
    .catch(err => {
        console.log("Response",err.data);
        throw err;
    });

}
export function updateStudent(payload) {
      const {id,...data} = payload;
    return axiosClient.put(`/users/${id}`, removeEmptyStrings(data))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}
