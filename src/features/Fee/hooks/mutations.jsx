import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { deleteFee, storeFee, updateFee } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreFeeMutation() {
  // const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: storeFee,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['fees'] })
      toast.success(data.message, { transition: Flip });
      //navigate("/fees", { replace: true })
     setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateFeeMutation() {
  //const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: updateFee,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['fees'] })
      toast.success(data.message, { transition: Flip });
     // navigate("/fees", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useDeleteFeeMutation() {
 // const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: deleteFee,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['fees'] })
      toast.success(data.message, { transition: Flip });
     // navigate("/fees", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}