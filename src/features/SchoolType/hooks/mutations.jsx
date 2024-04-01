import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteSchoolType, storeSchoolType, updateSchoolType } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";


export function useStoreSchoolTypeMutation() {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: storeSchoolType,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['school_types'] })
        toast.success(data.message, { transition: Flip });
        navigate("/school_types", { replace: true })
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateSchoolTypeMutation() {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: updateSchoolType,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['school_types'] })
        toast.success(data.message, { transition: Flip });
        navigate("/school_types", { replace: true })
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useDeleteSchoolTypeMutation() {
  console.log('hooks deleting...')
    const navigate = useNavigate()
    return useMutation({
      mutationFn: deleteSchoolType,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['school_types'] })
        toast.success(data.message, { transition: Flip });
        navigate("/school_types", { replace: true })
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/school_types/create", { replace: true })


      }
    })
  }