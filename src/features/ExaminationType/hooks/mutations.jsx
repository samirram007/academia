import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { deleteExaminationType, storeExaminationType, updateExaminationType } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreExaminationTypeMutation() {
  // const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: storeExaminationType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ExaminationTypes'] })
      toast.success(data.message, { transition: Flip });
      //navigate("/ExaminationTypes", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateExaminationTypeMutation() {
  //const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: updateExaminationType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ExaminationTypes'] })
      toast.success(data.message, { transition: Flip });
      // navigate("/ExaminationTypes", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useDeleteExaminationTypeMutation() {
  // const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deleteExaminationType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ExaminationTypes'] })
      toast.success(data.message, { transition: Flip });
      // navigate("/ExaminationTypes", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}