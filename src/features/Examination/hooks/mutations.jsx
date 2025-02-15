import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  deleteExaminationService,
  storeExaminationService,
  updateExaminationService,
} from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";

export function useStoreExaminationMutation() {
  const navigate = useNavigate();
  const { setOpen } = useFormModal();
  return useMutation({
    mutationFn: storeExaminationService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examinations"] });
      toast.success(data.message, { transition: Flip });
      navigate("/examinations", { replace: true });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip });
      //  navigate("/examination_types/create", { replace: true })
    },
  });
}
export function useUpdateExaminationMutation() {
  const navigate = useNavigate();
  const { setOpen } = useFormModal();
  return useMutation({
    mutationFn: updateExaminationService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examinations"] });
      toast.success(data.message, { transition: Flip });
      navigate("/examinations", { replace: true });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip });
      // navigate("/examination_types/create", { replace: true })
    },
  });
}
export function useDeleteExaminationMutation() {
  const navigate = useNavigate();
  const { setOpen } = useFormModal();
  return useMutation({
    mutationFn: deleteExaminationService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examination_types"] });
      toast.success(data.message, { transition: Flip });
      navigate("/examinations", { replace: true });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip });
      // navigate("/examination_types/create", { replace: true })
    },
  });
}
