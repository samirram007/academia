import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { deleteExpense, storeExpense, updateExpense } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreExpenseMutation() {
  // const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: storeExpense,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['expenses'] })
      toast.success(data.message, { transition: Flip });
      //navigate("/expenses", { replace: true })
     setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateExpenseMutation() {
  //const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: updateExpense,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['expenses'] })
      toast.success(data.message, { transition: Flip });
     // navigate("/expenses", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useDeleteExpenseMutation() {
 // const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['expenses'] })
      toast.success(data.message, { transition: Flip });
     // navigate("/expenses", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}