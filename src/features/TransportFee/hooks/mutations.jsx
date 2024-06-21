import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteTransportFeeService, storeTransportFeeService, updateTransportFeeService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreTransportFeeMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: storeTransportFeeService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['transport_fees'] })
        toast.success(data.message, { transition: Flip });
       navigate("/transport_fees", { replace: true })
       setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateTransportFeeMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateTransportFeeService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['transport_fees'] })
        toast.success(data.message, { transition: Flip });
        navigate("/transport_fees", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/transport_fees/create", { replace: true })


      }
    })
  }
export function useDeleteTransportFeeMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteTransportFeeService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['transport_fees'] })
        toast.success(data.message, { transition: Flip });
        navigate("/transport_fees", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/transport_fees/create", { replace: true })


      }
    })
  }