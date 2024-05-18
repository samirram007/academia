import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { deleteFeeTemplateItem, storeFeeTemplateItem, updateFeeTemplateItem } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreFeeTemplateItemMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: storeFeeTemplateItem,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['fee_template_items'] })
      toast.success(data.message, { transition: Flip });
      // navigate("/fee_templates", { replace: true })
    // setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateFeeTemplateItemMutation() {

  return useMutation({
    mutationFn: updateFeeTemplateItem,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['fee_template_items'] })
      toast.success(data.message, { transition: Flip });
      // navigate("/fee_templates", { replace: true })
   //   setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useDeleteFeeTemplateItemMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: deleteFeeTemplateItem,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['fee_template_items'] })
      toast.success(data.message, { transition: Flip });
      // navigate("/fee_templates", { replace: true })
      // setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}