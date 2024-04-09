import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteDepartmentService, storeDepartmentService, updateDepartmentService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreDepartmentMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: storeDepartmentService,
    onSuccess: (data) => {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      toast.success(data.message, { transition: Flip });
      navigate("/departments", { replace: true })

    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


    }
  })
}
export function useUpdateDepartmentMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: updateDepartmentService,
    onSuccess: (data) => {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['departments'] })


      toast.success(data.message, { transition: Flip });
      navigate("/departments", { replace: true })

    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
      // navigate("/departments/create", { replace: true })


    }
  })
}
export function useDeleteDepartmentMutation() {

  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deleteDepartmentService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['departments'] })
      toast.success(data.message, { transition: Flip });
      navigate("/departments", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
      // navigate("/departments/create", { replace: true })


    }
  })
}