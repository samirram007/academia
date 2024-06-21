import { useQuery } from "@tanstack/react-query"
 import { fetchStudentById, fetchStudents } from "../services/apis"
import { useCallback } from "react"


 export function useStudents(payload) {

  return useQuery({
    queryKey: ['students',payload],
    queryFn: ()=>fetchStudents(payload),
    enabled:!!payload,
    staleTime: Infinity,

  })
}
 export function useStudent(id) {

    return useQuery({
      queryKey: ['students',{id}],
      queryFn: ()=>fetchStudentById(id),
      staleTime:Infinity
    })
  }

