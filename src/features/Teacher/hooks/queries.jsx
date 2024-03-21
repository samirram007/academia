import { useQuery } from "@tanstack/react-query"
 import { fetchTeacherById, fetchTeachers } from "../services/apis"

 export function useTeacher(id) {
    return useQuery({
      queryKey: ['teachers',{id}],
      queryFn: ()=>fetchTeacherById(id),
      staleTime:Infinity
    })
  }
export function useTeachers() {
    return useQuery({
      queryKey: ['teachers'],
      queryFn: fetchTeachers,
      staleTime: Infinity // keep data fresh for this period (1 min.)
    })
  }
