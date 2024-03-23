import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { storeAcademicSession } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";


export function useStoreAcademicSessionMutation() {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: storeAcademicSession,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['academic_sessions'] })
        toast.success(data.message, { transition: Flip });
        navigate("/academic_sessions", { replace: true })
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        navigate("/academic_sessions/create", { replace: true })


      }
    })
  }