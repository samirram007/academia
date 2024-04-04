import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteDesignationService, storeDesignationService, updateDesignationService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreDesignationMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: storeDesignationService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['designations'] })
        toast.success(data.message, { transition: Flip });
       navigate("/designations", { replace: true })
       setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateDesignationMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateDesignationService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['designations'] })
        toast.success(data.message, { transition: Flip });
        navigate("/designations", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/designations/create", { replace: true })


      }
    })
  }
export function useDeleteDesignationMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteDesignationService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['designations'] })
        toast.success(data.message, { transition: Flip });
        navigate("/designations", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/designations/create", { replace: true })


      }
    })
  }