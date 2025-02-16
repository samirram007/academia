import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteExaminationTypeService, storeExaminationTypeService, updateExaminationTypeService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreExaminationTypeMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: storeExaminationTypeService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['examination_types'] })
        toast.success(data.message, { transition: Flip });
       navigate("/examination_types", { replace: true })
       setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/examination_types/create", { replace: true })


      }
    })
  }
export function useUpdateExaminationTypeMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateExaminationTypeService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['examination_types'] })
        toast.success(data.message, { transition: Flip });
        navigate("/examination_types", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/examination_types/create", { replace: true })


      }
    })
  }
export function useDeleteExaminationTypeMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteExaminationTypeService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['examination_types'] })
        toast.success(data.message, { transition: Flip });
        navigate("/examination_types", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/examination_types/create", { replace: true })


      }
    })
  }