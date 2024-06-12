import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { deleteTransportExpense, storeTransportExpense, updateTransportExpense } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreTransportExpenseMutation() {
  // const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: storeTransportExpense,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['transport_expenses'] })
      toast.success(data.message, { transition: Flip });
      //navigate("/transport_expenses", { replace: true })
     setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateTransportExpenseMutation() {
  //const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: updateTransportExpense,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['transport_expenses'] })
      toast.success(data.message, { transition: Flip });
     // navigate("/transport_expenses", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useDeleteTransportExpenseMutation() {
 // const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: deleteTransportExpense,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['transport_expenses'] })
      toast.success(data.message, { transition: Flip });
     // navigate("/expenses", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}