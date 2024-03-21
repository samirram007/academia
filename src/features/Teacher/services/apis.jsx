import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";

export async function fetchTeachers() {
    const response = await axiosClient.get(`/users?user_type=teacher`);

    return response.data
}
export async function fetchTeacherById(id) {
    return (await axiosClient.get(`/users/${id}?user_type=teacher`)).data
}
export function storeTeacher(payload) {

    return axiosClient.post("/users", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateTeacher(payload) {
  // console.log(payload);
      const {id,...data} = payload;
    return axiosClient.put(`/users/${id}`, removeEmptyStrings(data))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}
