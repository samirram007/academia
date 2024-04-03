import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteEducationBoard, storeEducationBoard, updateEducationBoard } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";


export function useStoreEducationBoardMutation() {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: storeEducationBoard,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['education_boards'] })
        toast.success(data.message, { transition: Flip });
        navigate("/education_boards", { replace: true })
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        navigate("/education_boards/create", { replace: true })


      }
    })
  }
export function useUpdateEducationBoardMutation() {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: updateEducationBoard,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['education_boards'] })
        toast.success(data.message, { transition: Flip });
        navigate("/education_boards", { replace: true })
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        navigate("/education_boards/create", { replace: true })


      }
    })
  }
export function useDeleteEducationBoardMutation() {

    const navigate = useNavigate()
    return useMutation({
      mutationFn: deleteEducationBoard,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['education_boards'] })
        toast.success(data.message, { transition: Flip });
        navigate("/education_boards", { replace: true })
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/education_boards/create", { replace: true })


      }
    })
  }