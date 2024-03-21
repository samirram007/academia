import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { storeTeacher, updateTeacher } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
export function useStoreTeacherMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: storeTeacher,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['teachers'] })
      toast.success(data.message, { transition: Flip });
      navigate("/teachers", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateTeacherMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateTeacher,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['teachers'] })
      toast.success(data.message, { transition: Flip });
      navigate("/teachers", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
