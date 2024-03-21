import { useMutation } from '@tanstack/react-query'
import {   storeAcademicClass } from '../services'

import { useNavigate } from 'react-router-dom';
import { Flip, toast } from 'react-toastify';
import { queryClient } from '../../../utils/queryClient';








export function useStoreAcademicClassMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: storeAcademicClass,
    onSuccess: (data) => {

     queryClient.invalidateQueries({ queryKey: ['academic_classes'] })
      toast.success(data.message, { transition: Flip });
      navigate("/academic_classes", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
      navigate("/academic_classes/create", { replace: true })


    }
  })
}