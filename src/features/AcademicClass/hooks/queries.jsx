import { useQuery } from "@tanstack/react-query"
import { fetchAcademicClassByCampusIdService, fetchAcademicClassService, fetchAcademicClassServices } from "../services/apis"


export  function useAcademicClasses(payload) {

      return   useQuery  ({
      queryKey: ['academic_classes',payload],
      queryFn: ()=> fetchAcademicClassServices(payload),
      staleTime:1000*60,
      retry:false,
      enabled:!!payload.campus_id
    })
  }
  export function useAcademicClass(id) {
    return useQuery({
      queryKey: ['academic_classes',id],
      queryFn: ()=>fetchAcademicClassService(id),
    })
  }

  export function useAcademicClassesByCampusId(campusId) {
    return useQuery({
      queryKey: ['academic_classes','campus',campusId],
      queryFn: ()=>fetchAcademicClassByCampusIdService(campusId),
    })
  }