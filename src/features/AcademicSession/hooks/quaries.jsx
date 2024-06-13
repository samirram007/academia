import { useQuery } from "@tanstack/react-query"
import { fetchAcademicSessionByCampusIdService, fetchAcademicSessionService, fetchAcademicSessionServices } from "../services/apis"


export  function useAcademicSessions() {

      return   useQuery  ({
      queryKey: ['academic_sessions'],
      queryFn: fetchAcademicSessionServices ,
      staleTime:Infinity,
      retry:false,
    })
  }
  export function useAcademicSession(id) {
    return useQuery({
      queryKey: ['academic_sessions',id],
      queryFn: ()=>fetchAcademicSessionService(id),
    })
  }

  export function useAcademicSessionsByCampusId(campusId) {
    return useQuery({
      queryKey: ['academic_sessions','campus',campusId],
      queryFn: ()=>fetchAcademicSessionByCampusIdService(campusId),
    })
  }