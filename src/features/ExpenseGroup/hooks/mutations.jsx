import { useMutation } from "@tanstack/react-query";


import { useNavigate } from 'react-router';
import { queryClient } from "../../../utils/queryClient";
import { storeExpenseGroup, updateExpenseGroup } from "../services/apis";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreExpenseGroupMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: storeExpenseGroup,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['expense_groups'] })
      toast.success(data.message, { transition: Flip });
      navigate("/expense_groups", { replace: true })
     setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateExpenseGroupMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: updateExpenseGroup,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['expense_groups'] })
      toast.success(data.message, { transition: Flip });
      navigate("/expense_groups", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
