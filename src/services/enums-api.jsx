import axiosClient from '../utils/axios-client'
export function  fetchAddressType(){
    return axiosClient.get("/address_type")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function fetchCaste() {
    return axiosClient.get("/caste")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function fetchGender() {
    return axiosClient.get("/gender")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function  fetchGuardianType(){
    return axiosClient.get("/guardian_type")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function  fetchSubjectType(){
    return axiosClient.get("/subject_type")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function  fetchLanguage(){
    return axiosClient.get("/language")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}

export function  fetchNationality(){
    return axiosClient.get("/nationality")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function  fetchReligion(){
    return axiosClient.get("/religion")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function  fetchRoomType(){
    return axiosClient.get("/room_type")
        .then(response => {

            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function  fetchUserStatus(){
    return axiosClient.get("/user_status")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function  fetchUserType(){
    return axiosClient.get("/user_type")
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}