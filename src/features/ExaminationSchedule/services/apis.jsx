import axiosClient from "@/utils/axios-client";

export function fetchExaminationScheduleService(id) {
  return axiosClient.get(`/examination_schedule/${id}`).then(({ data }) => {
    return data;
  });
}
export function fetchExaminationSchedulesService(payload) {
  return axiosClient
    .get(`/examination_schedule`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function storeExaminationScheduleService(payload) {
  return axiosClient.post("/examination_schedule", payload).then((response) => {
    return response.data;
  });
}
export function updateExaminationScheduleService(payload) {
  const { id, ...data } = payload;
  return axiosClient
    .put(`/examination_schedule/${id}`, data)
    .then((response) => {
      return response.data;
    });
}
export function deleteExaminationScheduleService(payload) {
  const { id, ...data } = payload;
  return axiosClient.delete(`/examination_schedule/${id}`).then((response) => {
    return response.data;
  });
}
