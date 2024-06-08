import { useMutation } from "@tanstack/react-query";


import { useNavigate, useParams  } from "react-router-dom";
import { storeEnrollment,  updateEnrollment  } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreEnrollmentMutation() {
  const navigate = useNavigate()
  const student_id=useParams('id')
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: storeEnrollment,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['students'] })
    // queryClient.invalidateQueries({ queryKey: ['students',student_id] })
      toast.success(data.message, { transition: Flip });
      navigate(`/students`, { replace: true })
      // navigate(`/students/info/${student_id.id}`, { replace: true })
      setOpen(false)

    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateEnrollmentMutation() {
  const navigate = useNavigate()
  const {setOpen}=useFormModal()
  return useMutation({
    mutationFn: updateEnrollment,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['students'] })
    //  queryClient.invalidateQueries({ queryKey: ['student_sessions'] })
      toast.success(data.message, { transition: Flip });
      navigate("/students", { replace: true })
      setOpen(false)

    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
