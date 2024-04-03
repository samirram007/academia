import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteSchoolTypeService, storeSchoolTypeService, updateSchoolTypeService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreSchoolTypeMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: storeSchoolTypeService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['school_types'] })
        toast.success(data.message, { transition: Flip });
       navigate("/school_types", { replace: true })
       setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateSchoolTypeMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateSchoolTypeService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['school_types'] })
        toast.success(data.message, { transition: Flip });
        navigate("/school_types", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useDeleteSchoolTypeMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteSchoolTypeService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['school_types'] })
        toast.success(data.message, { transition: Flip });
        navigate("/school_types", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/school_types/create", { replace: true })


      }
    })
  }