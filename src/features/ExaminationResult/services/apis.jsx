import axiosClient from "@/utils/axios-client";

export function fetchExaminationResultService(id) {
  return axiosClient.get(`/examination_result/${id}`).then(({ data }) => {
    return data;
  });
}
export function fetchExaminationResultsService(payload) {
  return axiosClient
    .get(`/examination_result`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function storeExaminationResultService(payload) {
  return axiosClient.post("/examination_result", payload).then((response) => {
    return response.data;
  });
}
export function updateExaminationResultService(payload) {
  const { id, ...data } = payload;
  return axiosClient.put(`/examination_result/${id}`, data).then((response) => {
    return response.data;
  });
}
export function deleteExaminationResultService(payload) {
  const { id, ...data } = payload;
  return axiosClient.delete(`/examination_result/${id}`).then((response) => {
    return response.data;
  });
}
