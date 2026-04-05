import { useQuery } from "@tanstack/react-query";

import { useCallback } from "react";
import { fetchAcademicSessionByCampusIdService, fetchAcademicSessionService, fetchAcademicSessionServices } from "../services/apis";


export function useAcademicSessions(payload) {

  const filterCallbackFn = useCallback(
    (data) => {
      if (payload.is_current) {
        return { data: data.data.filter(x => x.is_current == true) }
      }
      return { data: data.data }
    }, [payload.is_current])
  return useQuery({
    queryKey: ['academic_sessions'],
    queryFn: fetchAcademicSessionServices,
    staleTime: Infinity,
    retry: false,
    select: filterCallbackFn
  })
}
export function useAcademicSession(id) {
  return useQuery({
    queryKey: ['academic_sessions', id],
    queryFn: () => fetchAcademicSessionService(id),
  })
}


export function useAcademicSessionsByCampusId(campusId) {
  return useQuery({
    queryKey: ["academic_sessions", "campus", campusId],
    queryFn: () => fetchAcademicSessionByCampusIdService(campusId),
  });
}
