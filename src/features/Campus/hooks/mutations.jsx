import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router-dom";
import { storeCampus, updateCampus } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
export function useStoreCampusMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: storeCampus,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['campuses'] })
      toast.success(data.message, { transition: Flip });
      navigate("/campuses", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateCampusMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateCampus,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['campuses'] })
      toast.success(data.message, { transition: Flip });
      navigate("/campuses", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
