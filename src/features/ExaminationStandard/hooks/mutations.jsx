import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  deleteExaminationStandardService,
  storeExaminationStandardService,
  updateExaminationStandardService,
} from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";

export function useStoreExaminationStandardMutation() {
  const navigate = useNavigate();
  const { setOpen } = useFormModal();
  return useMutation({
    mutationFn: storeExaminationStandardService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examination_standard"] });
      toast.success(data.message, { transition: Flip });
      navigate("/examination_standard", { replace: true });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip });
      //  navigate("/examination_types/create", { replace: true })
    },
  });
}
export function useUpdateExaminationStandardMutation() {
  const navigate = useNavigate();
  const { setOpen } = useFormModal();
  return useMutation({
    mutationFn: updateExaminationStandardService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examination_standard"] });
      toast.success(data.message, { transition: Flip });
      navigate("/examination_standard", { replace: true });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip });
      // navigate("/examination_types/create", { replace: true })
    },
  });
}
export function useDeleteExaminationStandardMutation() {
  const navigate = useNavigate();
  const { setOpen } = useFormModal();
  return useMutation({
    mutationFn: deleteExaminationStandardService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examination_standard"] });
      toast.success(data.message, { transition: Flip });
      navigate("/examination_standard", { replace: true });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip });
      // navigate("/examination_types/create", { replace: true })
    },
  });
}
