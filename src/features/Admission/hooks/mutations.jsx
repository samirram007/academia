import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteAdmissionService, storeAdmissionService, updateAdmissionService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreAdmissionMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: storeAdmissionService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['admissions'] })
        toast.success(data.message, { transition: Flip });
       navigate("/admissions", { replace: true })
       setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateAdmissionMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateAdmissionService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['admissions'] })
        toast.success(data.message, { transition: Flip });
        navigate("/admissions", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/admissions/create", { replace: true })


      }
    })
  }
export function useDeleteAdmissionMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteAdmissionService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['admissions'] })
        toast.success(data.message, { transition: Flip });
        navigate("/admissions", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/admissions/create", { replace: true })


      }
    })
  }