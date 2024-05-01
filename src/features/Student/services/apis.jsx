import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";

export async function fetchStudents() {
    const response = await axiosClient.get(`/users?user_type=student`);

    return response.data
}
export async function fetchStudentById(id) {
    return (await axiosClient.get(`/users/${id}?user_type=student`)).data
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
