import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { storeExpenseHead, updateExpenseHead } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreExpenseHeadMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: storeExpenseHead,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['expense_heads'] })
      toast.success(data.message, { transition: Flip });
      navigate("/expense_heads", { replace: true })
     setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateExpenseHeadMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: updateExpenseHead,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['expense_heads'] })
      toast.success(data.message, { transition: Flip });
      navigate("/expense_heads", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
