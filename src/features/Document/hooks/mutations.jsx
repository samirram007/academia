import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";

import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";

import { deleteDocument, storeDocuments, updateDocument } from "../services/apis";
export function useStoreDocumentMutation() {

  return useMutation({
    mutationFn: storeDocuments,
    onSuccess: (data) => {

     queryClient.invalidateQueries({ queryKey: ['documents'] })
      toast.success(data.message, { transition: Flip });

    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })



    }
  })
}
export function useUpdateDocumentMutation() {

  return useMutation({
    mutationFn:updateDocument,
    onSuccess: (data) => {

     queryClient.invalidateQueries({ queryKey: ['documents'] })
      toast.success(data.message, { transition: Flip });
      //navigate("/documents", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
     // navigate("/academic_sessions", { replace: true })


    }
  })
}

export function useDocumentDeleteMutation(){
  return  useMutation({
    mutationFn: deleteDocument,
    onSuccess: (data) => {

        // toast.success(data.message, { transition: Flip });
        queryClient.invalidateQueries({ queryKey: ['documents'] })
        toast("File deleted successfully", { transition: Flip });
        handleFilter(localStorage.imageFilter)

    },
    onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
    }
})
}

