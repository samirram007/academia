import axiosClient from "../../../utils/axios-client";


export function  fetchMonthService(){

    return axiosClient.get(`/months`)
    .then(({ data }) => {
        return data;
    })
    .catch(err => {

        throw err;
    });
}