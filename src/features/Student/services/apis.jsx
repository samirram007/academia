import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";

export function fetchStudents(payload) {

    // console.log(`/student_sessions?${payload}`)
    payload = removeEmptyStrings(payload)
    //console.log(payload)
    let filterString = `?`
    if (payload.filter_option) {
        filterString += `&filter_option=${payload.filter_option}`
    }
    if (payload.academic_session_id) {
        filterString += `&academic_session_id=${payload.academic_session_id}`
    }
    if (payload.academic_class_id) {
        filterString += `&academic_class_id=${payload.academic_class_id}`
    }

    return (axiosClient.get(`/students${filterString}`))
        .then(response => {

            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export async function fetchStudentById(id) {
   // console.log('student_id:',id);
   return (await axiosClient.get(`/students/${id}`)).data
}
export function storeStudent(payload) { 
    return axiosClient.post("/students", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);

            throw err;
        });

}
export function updateStudent(payload) {
    const { id, ...data } = payload;
    console.log('student update', id, removeEmptyStrings(data))
    return axiosClient.put(`/students/${id}`, removeEmptyStrings(data))
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}
export function storeStudentFee(payload) {
  //  console.log('payload',removeEmptyStrings(payload));
     //return
    return axiosClient.post("/fees", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })
        .catch(err => {

            throw err;
        });

}
export function updateStudentFee(payload) {
    const { id, ...data } = payload;
  //  console.log(removeEmptyStrings(payload));
    return axiosClient.put(`/fees/${id}`, removeEmptyStrings(data))
        .then(response => {

            return response.data;
        })
        .catch(err => {

            throw err;
        });

}

export function storeGuardian(payload) {
    // console.log("Guardian payload", removeEmptyStrings(payload));
    return axiosClient.post("/guardians", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function updateGuardian(payload) {
    const { id, ...data } = payload;

    // console.log("Guardian payload", id, removeEmptyStrings(data));
    return axiosClient.put(`/guardians/${id}`, removeEmptyStrings(data))
        .then(response => {
// console.log('success update');

            return response.data;
        })
        .catch(err => {
            throw err;
        });
}