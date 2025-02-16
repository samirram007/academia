import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  deleteExaminationResultService,
  storeExaminationResultService,
  updateExaminationResultService,
} from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";

export function useStoreExaminationResultMutation() {
  const navigate = useNavigate();
  const { setOpen } = useFormModal();
  return useMutation({
    mutationFn: storeExaminationResultService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examination_results"] });
      toast.success(data.message, { transition: Flip });
      navigate("/examination_results", { replace: true });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip });
      //  navigate("/examination_types/create", { replace: true })
    },
  });
}
export function useUpdateExaminationResultMutation() {
  const navigate = useNavigate();
  const { setOpen } = useFormModal();
  return useMutation({
    mutationFn: updateExaminationResultService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examination_results"] });
      toast.success(data.message, { transition: Flip });
      navigate("/examination_results", { replace: true });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip });
      // navigate("/examination_types/create", { replace: true })
    },
  });
}
export function useDeleteExaminationResultMutation() {
  const navigate = useNavigate();
  const { setOpen } = useFormModal();
  return useMutation({
    mutationFn: deleteExaminationResultService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examination_results"] });
      toast.success(data.message, { transition: Flip });
      navigate("/examination_results", { replace: true });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip });
      // navigate("/examination_types/create", { replace: true })
    },
  });
}
