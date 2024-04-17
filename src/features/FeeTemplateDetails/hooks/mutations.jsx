import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { deleteFeeTemplateDetails, storeFeeTemplateDetails, updateFeeTemplateDetails } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreFeeTemplateDetailsMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: storeFeeTemplateDetails,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['fee_template_details'] })
      toast.success(data.message, { transition: Flip });
      // navigate("/fee_templates", { replace: true })
    // setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateFeeTemplateDetailsMutation() {

  return useMutation({
    mutationFn: updateFeeTemplateDetails,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['fee_template_details'] })
      toast.success(data.message, { transition: Flip });
      // navigate("/fee_templates", { replace: true })
   //   setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useDeleteFeeTemplateDetailsMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: deleteFeeTemplateDetails,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['fee_template_details'] })
      toast.success(data.message, { transition: Flip });
      // navigate("/fee_templates", { replace: true })
      // setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}