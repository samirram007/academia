import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { storeIncomeGroup, updateIncomeGroup } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreIncomeGroupMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: storeIncomeGroup,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['income_groups'] })
      toast.success(data.message, { transition: Flip });
      navigate("/income_groups", { replace: true })
     setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateIncomeGroupMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: updateIncomeGroup,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['income_groups'] })
      toast.success(data.message, { transition: Flip });
      navigate("/income_groups", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
