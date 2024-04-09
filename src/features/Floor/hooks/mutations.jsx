import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteFloorService, storeFloorService, updateFloorService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreFloorMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: storeFloorService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['floors'] })
        toast.success(data.message, { transition: Flip });
       navigate("/floors", { replace: true })
       setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateFloorMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateFloorService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['floors'] })
        toast.success(data.message, { transition: Flip });
        navigate("/floors", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/floors/create", { replace: true })


      }
    })
  }
export function useDeleteFloorMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteFloorService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['floors'] })
        toast.success(data.message, { transition: Flip });
        navigate("/floors", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/floors/create", { replace: true })


      }
    })
  }