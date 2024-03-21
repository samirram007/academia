import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { storeAcademicYear } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";


export function useStoreAcademicYearMutation() {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: storeAcademicYear,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['academic_years'] })
        toast.success(data.message, { transition: Flip });
        navigate("/academic_years", { replace: true })
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        navigate("/academic_years/create", { replace: true })


      }
    })
  }