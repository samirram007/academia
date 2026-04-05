import axiosClient from "@/utils/axios-client";
import { deleteData, getData, postData, putData } from "@/utils/dataClient";

const modulePath = "/examination";
export function fetchExaminationService(id) {

    return axiosClient.get(`${modulePath}/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchExaminationsService(payload) {

    return getData(`${modulePath}`)

}

export function storeExaminationService(payload) {

    return postData(`${modulePath}`, payload)

}
export function updateExaminationService(payload) {

    const { id, ...data } = payload
    return putData(`${modulePath}/${id}`, data)


}
export function deleteExaminationService(payload) {
    const { id } = payload
    return deleteData(`${modulePath}/${id}`)

}

