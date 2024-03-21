import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { storeFeeTemplate, updateFeeTemplate } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreFeeTemplateMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: storeFeeTemplate,
    onSuccess: (data) => {
      console.log(data)
     queryClient.invalidateQueries({ queryKey: ['fee_templates'] })
      toast.success(data.message, { transition: Flip });
      navigate("/fee_templates", { replace: true })
     setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateFeeTemplateMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: updateFeeTemplate,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['fee_templates'] })
      toast.success(data.message, { transition: Flip });
      navigate("/fee_templates", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}