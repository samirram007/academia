import { useQuery } from '@tanstack/react-query'
import {
  fetchAcademicClass,
  fetchAcademicClasses
} from '../services/apis'



export function useAcademicClasses(payload) {
  return useQuery({
    queryKey: ['academic_classes',payload],
    queryFn: ()=>fetchAcademicClasses(payload),
    staleTime:1000,
    enabled:!!payload
  })
}
export function useAcademicClass(id) {
  return useQuery({
    queryKey: ['academic_classes',id],
    queryFn: ()=>fetchAcademicClass(id),
  })
}