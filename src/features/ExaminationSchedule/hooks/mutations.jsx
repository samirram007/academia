import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  deleteExaminationScheduleService,
  storeExaminationScheduleService,
  updateExaminationScheduleService,
} from "../services/apis";
import { queryClient } from "../../../utils/queryClient";
import { Flip, toast } from "react-toastify";
import { useFormModal } from "../../../contexts/FormModalProvider";

export function useStoreExaminationScheduleMutation() {
  const navigate = useNavigate();
  const { setOpen } = useFormModal();
  return useMutation({
    mutationFn: storeExaminationScheduleService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examination_schedules"] });
      toast.success(data.message, { transition: Flip });
      navigate("/examination_schedules", { replace: true });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip });
      //  navigate("/examination_types/create", { replace: true })
    },
  });
}
export function useUpdateExaminationScheduleMutation() {
  const navigate = useNavigate();
  const { setOpen } = useFormModal();
  return useMutation({
    mutationFn: updateExaminationScheduleService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examination_schedules"] });
      toast.success(data.message, { transition: Flip });
      navigate("/examination_schedules", { replace: true });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip });
      // navigate("/examination_types/create", { replace: true })
    },
  });
}
export function useDeleteExaminationScheduleMutation() {
  const navigate = useNavigate();
  const { setOpen } = useFormModal();
  return useMutation({
    mutationFn: deleteExaminationScheduleService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["examination_schedules"] });
      toast.success(data.message, { transition: Flip });
      navigate("/examination_schedules", { replace: true });
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.message, { transition: Flip });
      // navigate("/examination_types/create", { replace: true })
    },
  });
}
