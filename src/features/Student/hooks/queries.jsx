import { useQuery } from "@tanstack/react-query"
 import { fetchStudentById, fetchStudents } from "../services/apis"

 export function useStudent(id) {
    return useQuery({
      queryKey: ['students',{id}],
      queryFn: ()=>fetchStudentById(id),
      staleTime:Infinity
    })
  }
export function useStudents(payload) {
    return useQuery({
      queryKey: ['students',payload],
      queryFn: ()=>fetchStudents(payload),
      staleTime: Infinity // keep data fresh for this period (1 min.)
    })
  }
