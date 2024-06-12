import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteTransportTypeService, storeTransportTypeService, updateTransportTypeService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreTransportTypeMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: storeTransportTypeService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['transport_types'] })
        toast.success(data.message, { transition: Flip });
       navigate("/transport_types", { replace: true })
       setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateTransportTypeMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateTransportTypeService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['transport_types'] })
        toast.success(data.message, { transition: Flip });
        navigate("/transport_types", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/transport_types/create", { replace: true })


      }
    })
  }
export function useDeleteTransportTypeMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteTransportTypeService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['transport_types'] })
        toast.success(data.message, { transition: Flip });
        navigate("/transport_types", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/transport_types/create", { replace: true })


      }
    })
  }