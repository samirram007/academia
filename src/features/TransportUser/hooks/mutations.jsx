import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteTransportUserService, storeTransportUserService, updateTransportUserService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreTransportUserMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: storeTransportUserService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['transport_users'] })
        toast.success(data.message, { transition: Flip });
       navigate("/transport_users", { replace: true })
       setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateTransportUserMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateTransportUserService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['transport_users'] })
        toast.success(data.message, { transition: Flip });
        navigate("/transport_users", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/transport_users/create", { replace: true })


      }
    })
  }
export function useDeleteTransportUserMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteTransportUserService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['transport_users'] })
        toast.success(data.message, { transition: Flip });
        navigate("/transport_users", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/transport_users/create", { replace: true })


      }
    })
  }