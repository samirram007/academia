import { useMutation } from '@tanstack/react-query'


import { useNavigate } from 'react-router-dom';
import { Flip, toast } from 'react-toastify';
import { queryClient } from '../utils/queryClient';








export function useStoreSubjectMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: storeSubject,
    onSuccess: (data) => {

     queryClient.invalidateQueries({ queryKey: ['subjects'] })
      toast.success(data.message, { transition: Flip });
      navigate("/subjects", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip })
      //navigate("/subjects/create", { replace: true })


    }
  })
}
