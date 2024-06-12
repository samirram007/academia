import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteTransportService, storeTransportService, updateTransportService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreTransportMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: storeTransportService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['transports'] })
        toast.success(data.message, { transition: Flip });
       navigate("/transports", { replace: true })
       setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateTransportMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateTransportService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['transports'] })
        toast.success(data.message, { transition: Flip });
        navigate("/transports", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/transports/create", { replace: true })


      }
    })
  }
export function useDeleteTransportMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteTransportService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['transports'] })
        toast.success(data.message, { transition: Flip });
        navigate("/transports", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/transports/create", { replace: true })


      }
    })
  }