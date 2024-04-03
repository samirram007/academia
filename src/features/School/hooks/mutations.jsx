import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { deleteSchoolService, storeSchoolService, updateSchoolService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreSchoolMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: storeSchoolService,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['schools'] })
      toast.success(data.message, { transition: Flip });
      navigate("/schools", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateSchoolMutation() {
  const navigate = useNavigate()
  
  return useMutation({
    mutationFn: updateSchoolService,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['schools'] })
      toast.success(data.message, { transition: Flip });
      navigate("/schools", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useDeleteSchoolMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: deleteSchoolService,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['schools'] })
      toast.success(data.message, { transition: Flip });
      navigate("/schools", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
