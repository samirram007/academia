import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { storeAcademicStandard } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";


export function useStoreAcademicStandardMutation() {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: storeAcademicStandard,
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