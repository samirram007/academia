// import { toast } from "sonner";
import { toast } from "react-toastify";
import axiosClient from "./axios-client";
import { removeEmptyStrings } from "./removeEmptyStrings";

export const getData = async (apiPath) => {
    return await axiosClient.get(apiPath)
        .then((response) => {
            //successHandler(response)
            return response.data;
        })
        .catch((err) => {
            errorHandler(err)
            throw err
        })
}
export const postData = async (apiPath, payload) => {
    return await axiosClient.post(apiPath, removeEmptyStrings(payload))
        .then(response => {
            successHandler(response)
            return response.data;
        })
        .catch((err) => {
            //console.log("Error",err)
            errorHandler(err)
            throw err

        })
}
export const putData = async (apiPath, payload) => {
    console.log(apiPath, removeEmptyStrings(payload))
    return await axiosClient.put(apiPath, removeEmptyStrings(payload))
        .then(response => {
            successHandler(response)
            return response.data;
        })
        .catch((err) => {
            errorHandler(err)
            throw err
        })
}
export const deleteData = async (apiPath) => {
    return await axiosClient.delete(apiPath)
        .then(response => {
            successHandler(response)
            return response.data;
        })
        .catch((err) => {
            errorHandler(err)
            throw err
        })
}

const successHandler = (response) => {
    toast.success(response?.data.message)
}

const errorHandler = (error) => {
    // Check if the error is from a response with data (usually API error responses)
    console.log(error);

    if (error.response?.data) {
        console.log('error here...', error.response.data)
        // If there are validation errors (e.g., from form submissions)
        if (error.response.data?.errors) {

            // Loop through each error in the errors object
            Object.keys(error.response.data.errors).forEach(field => {
                const fieldErrors = error.response.data.errors[field];
                // You can show individual field errors using toast or another method

                fieldErrors.forEach(errorMessage => {
                    // console.log('res',errorMessage)
                    toast.error(`${errorMessage}`);
                });
            });
        } else if (error.response.data.message) {
            // If there's a general message (e.g., non-validation error)
            toast.error(error.response.data.message);
        } else {
            // Fallback for unexpected error responses
            toast.error('An unexpected error occurred.');
        }
    } else {
        // Handle other error types, such as network errors or timeout errors
        toast.error('Network or server error occurred.');
    }
};