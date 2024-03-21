import axiosClient from '../utils/axios-client'
export function  fetchCountry(id){

   return  axiosClient.get(`/countries/${id}`)
    .then(({ data }) => {
        return data;
    })
}
export function fetchCountries() {

    return axiosClient.get("/countries")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

