import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteAcademicClassService, storeAcademicClassService, updateAcademicClassService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";


export function useStoreAcademicClassMutation() {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: storeAcademicClassService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['academic_classes'] })
        toast.success(data.message, { transition: Flip });
        navigate("/academic_classes", { replace: true })
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        navigate("/academic_classes/create", { replace: true })


      }
    })
  }
export function useUpdateAcademicClassMutation() {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: updateAcademicClassService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['academic_classes'] })
        toast.success(data.message, { transition: Flip });
        navigate("/academic_classes", { replace: true })
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        navigate("/academic_classes/create", { replace: true })


      }
    })
  }
export function useDeleteAcademicClassMutation() {

    const navigate = useNavigate()
    return useMutation({
      mutationFn: deleteAcademicClassService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['academic_classes'] })
        toast.success(data.message, { transition: Flip });
        navigate("/academic_classes", { replace: true })
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/academic_classes/create", { replace: true })


      }
    })
  }