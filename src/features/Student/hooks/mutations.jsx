import { useMutation } from "@tanstack/react-query";


import { useNavigate, useParams } from "react-router-dom";
import { storeStudent, storeStudentFee, updateStudent, updateStudentFee } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreStudentMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: storeStudent,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success(data.message, { transition: Flip });
      navigate("/students", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateStudentMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateStudent,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success(data.message, { transition: Flip });
      navigate("/students", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useStoreStudentGuardianMutation() {
  const student_id=useParams('id')
  const navigate = useNavigate()
  return useMutation({
    mutationFn: storeStudent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['students',student_id] })
      toast.success(data.message, { transition: Flip });
      navigate(`/students/edit/${student_id.id}`, { replace: true })

    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateStudentGuardianMutation() {
  const student_id=useParams('id')
  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateStudent,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['students',student_id] })
      toast.success(data.message, { transition: Flip });
      navigate(`/students/edit/${student_id.id}`, { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useStoreStudentAddressMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: storeStudent,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success(data.message, { transition: Flip });
      navigate("/students", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateStudentAddressMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateStudent,
    onSuccess: (data) => {
     queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success(data.message, { transition: Flip });
      navigate("/students", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}


export function useStoreStudentFeeMutation() {
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: storeStudentFee,
    onSuccess: (data) => {
    setOpen(prev=>!prev)
     queryClient.invalidateQueries({ queryKey: ['student_session_fees'] })

      toast.success(data.message, { transition: Flip });
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}
export function useUpdateStudentFeeMutation(param) {

  const navigate = useNavigate()
  return useMutation({
    mutationFn: updateStudentFee,
    onSuccess: (data) => {


     queryClient.invalidateQueries({ queryKey: ['student_session_fees',param] })
      toast.success(data.message, { transition: Flip });
     // navigate(`/students/info/${btoa(student_id.id)}`, { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
    }
  })
}