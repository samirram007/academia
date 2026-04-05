import axiosClient from "../../../utils/axios-client";
import { removeEmptyStrings } from "../../../utils/removeEmptyStrings";

export async function fetchTeachers() {
    const response = await axiosClient.get(`/teachers`);

    return response.data
}
export async function fetchTeacherById(id) {
    return (await axiosClient.get(`/teachers/${id}`)).data
}
export function storeTeacher(payload) {

    return axiosClient.post("/teachers", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateTeacher(payload) {
      const {id,...data} = payload;
    return axiosClient.put(`/teachers/${id}`, removeEmptyStrings(data))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}
