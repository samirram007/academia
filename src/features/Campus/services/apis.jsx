import axiosClient from "../../../utils/axios-client";


export function  fetchCampusById(id){

   return  axiosClient.get(`/campuses/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export async function fetchCampuses() {

    return await axiosClient.get("/campuses")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}

export function storeCampus(payload) {

    return axiosClient.post("/campuses", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateCampus(payload) {
  // console.log(payload);
      const {id,...data} = payload;
    return axiosClient.put(`/campuses/${id}`, removeEmptyStrings(data))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}
