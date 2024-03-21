import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { storeFeeHead, updateFeeHead } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreFeeHeadMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: storeFeeHead,
    onSuccess: (data) => {
      console.log(data)
     queryClient.invalidateQueries({ queryKey: ['fee_heads'] })
      toast.success(data.message, { transition: Flip });
      navigate("/fee_heads", { replace: true })
     setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateFeeHeadMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: updateFeeHead,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['fee_heads'] })
      toast.success(data.message, { transition: Flip });
      navigate("/fee_heads", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
