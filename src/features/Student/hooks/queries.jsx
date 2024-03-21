import { useQuery } from "@tanstack/react-query"
 import { fetchStudentById, fetchStudents } from "../services/apis"

 export function useStudent(id) {
    return useQuery({
      queryKey: ['students',{id}],
      queryFn: ()=>fetchStudentById(id),
      staleTime:Infinity
    })
  }
export function useStudents() {
    return useQuery({
      queryKey: ['students'],
      queryFn: fetchStudents,
      staleTime: Infinity // keep data fresh for this period (1 min.)
    })
  }
