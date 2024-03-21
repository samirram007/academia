import axiosClient from "../../../utils/axios-client";


export function  fetchSchoolById(id){

   return  axiosClient.get(`/schools/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchSchools() {

    return axiosClient.get("/schools")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}

export function storeSchool(payload) {

    return axiosClient.post("/schools", removeEmptyStrings(payload))
    .then(response => {

        return response.data;
    })
    .catch(err => {

        throw err;
    });

}
export function updateSchool(payload) {
  // console.log(payload);
      const {id,...data} = payload;
    return axiosClient.put(`/schools/${id}`, removeEmptyStrings(data))
    .then(response => {
        return response.data;
    })
    .catch(err => {
        throw err;
    });
}
