import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteBuildingService, storeBuildingService, updateBuildingService } from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";


export function useStoreBuildingMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: storeBuildingService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['buildings'] })
        toast.success(data.message, { transition: Flip });
       navigate("/buildings", { replace: true })
       setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      //  navigate("/school_types/create", { replace: true })


      }
    })
  }
export function useUpdateBuildingMutation() {
    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: updateBuildingService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['buildings'] })
        toast.success(data.message, { transition: Flip });
        navigate("/buildings", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
        // navigate("/buildings/create", { replace: true })


      }
    })
  }
export function useDeleteBuildingMutation() {

    const navigate = useNavigate()
    const {setOpen}=useFormModal()
    return useMutation({
      mutationFn: deleteBuildingService,
      onSuccess: (data) => {

       queryClient.invalidateQueries({ queryKey: ['buildings'] })
        toast.success(data.message, { transition: Flip });
        navigate("/buildings", { replace: true })
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
       // navigate("/buildings/create", { replace: true })


      }
    })
  }