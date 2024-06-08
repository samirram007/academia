import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteStudentIdCardService, storeStudentIdCardService, updateStudentIdCardService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreStudentIdCardMutation() {
    const navigate = useNavigate()

    return useMutation({
      mutationFn: storeStudentIdCardService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['student_id_cards'] })
        toast.success(data.message, { transition: Flip });
       navigate("/student_id_cards", { replace: true })

      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateStudentIdCardMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateStudentIdCardService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['student_id_cards'] })
        toast.success(data.message, { transition: Flip });
        navigate("/student_id_cards", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/student_id_cards/create", { replace: true })


      }
    })
  }
export function useDeleteStudentIdCardMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteStudentIdCardService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['student_id_cards'] })
        toast.success(data.message, { transition: Flip });
        navigate("/student_id_cards", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/student_id_cards/create", { replace: true })


      }
    })
  }