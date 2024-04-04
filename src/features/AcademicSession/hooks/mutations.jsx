import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteAcademicSessionService, storeAcademicSessionService, updateAcademicSessionService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";


export function useStoreAcademicSessionMutation() {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: storeAcademicSessionService,
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
export function useUpdateAcademicSessionMutation() {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: updateAcademicSessionService,
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
export function useDeleteAcademicSessionMutation() {

    const navigate = useNavigate()
    return useMutation({
      mutationFn: deleteAcademicSessionService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['academic_sessions'] })
        toast.success(data.message, { transition: Flip });
        navigate("/academic_sessions", { replace: true })
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/academic_sessions/create", { replace: true })


      }
    })
  }