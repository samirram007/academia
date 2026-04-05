import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { fetchAcademicClassByCampusIdService, fetchAcademicClassService, fetchAcademicClassServices } from "../services/apis";


export function useAcademicClasses(payload) {

  const filterCallbackFn = useCallback((data) => {

    if (payload.campus_id > 0) {
      return { data: data.data.filter(x => x.campus_id === parseInt(payload.campus_id)) }
    }
    return data

  }, [payload.campus_id]);

  return useQuery({
    queryKey: ['academic_classes'],
    queryFn: fetchAcademicClassServices,
    staleTime: Infinity,
    enabled: false,
    select: filterCallbackFn,
  })

}
export function useCampusAcademicClasses() {

  const filterCallbackFn = useCallback((data) => {
    // console.log('Data before filtering:', data);

    return { data: data.data }
  }, []);

  return useQuery({
    queryKey: ['academic_classes'],
    queryFn: fetchAcademicClassServices,
    staleTime: Infinity,
    select: filterCallbackFn,
    onSuccess: (data) => {
      console.log('Query success:', data);
    },
    onError: (error) => {
      console.log('Query error:', error);
    }
  })
  // console.log('fetchedData', fetchedData.data);

  // return fetchedData
}
export function useAcademicClass(id) {
  return useQuery({
    queryKey: ['academic_classes', id],
    queryFn: () => fetchAcademicClassService(id),
  })
}

export function useAcademicClassesByCampusId(campusId) {
  return useQuery({
    queryKey: ['academic_classes', 'campus', campusId],
    queryFn: () => fetchAcademicClassByCampusIdService(campusId),
  })
}