import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteSubjectService, storeSubjectService, updateSubjectService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreSubjectMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: storeSubjectService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['subjects'] })
        toast.success(data.message, { transition: Flip });
       navigate("/subjects", { replace: true })
       setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateSubjectMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateSubjectService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['subjects'] })
        toast.success(data.message, { transition: Flip });
        navigate("/subjects", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/subjects/create", { replace: true })


      }
    })
  }
export function useDeleteSubjectMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteSubjectService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['subjects'] })
        toast.success(data.message, { transition: Flip });
        navigate("/subjects", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/subjects/create", { replace: true })


      }
    })
  }