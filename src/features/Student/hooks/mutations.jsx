import { useMutation } from "@tanstack/react-query";


import { useNavigate, useParams } from "react-router-dom";
import { storeStudent, updateStudent } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";

import { Flip, toast } from "react-toastify";
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
