import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteSectionService, storeSectionService, updateSectionService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreSectionMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: storeSectionService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['sections'] })
        toast.success(data.message, { transition: Flip });
       navigate("/sections", { replace: true })
       setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateSectionMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateSectionService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['sections'] })
        toast.success(data.message, { transition: Flip });
        navigate("/sections", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/sections/create", { replace: true })


      }
    })
  }
export function useDeleteSectionMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteSectionService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['sections'] })
        toast.success(data.message, { transition: Flip });
        navigate("/sections", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/sections/create", { replace: true })


      }
    })
  }