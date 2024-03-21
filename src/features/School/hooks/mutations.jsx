import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { storeSchool, updateSchool } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
export function useStoreSchoolMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: storeSchool,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['schools'] })
      toast.success(data.message, { transition: Flip });
      navigate("/schools", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateSchoolMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateSchool,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['schools'] })
      toast.success(data.message, { transition: Flip });
      navigate("/schools", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
