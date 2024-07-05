import { useQuery } from "@tanstack/react-query"
import { fetchStudentById, fetchStudents } from "../services/apis"
import { useCallback } from "react"


export function useStudents(payload) {
  const filterCallbackFn = useCallback((data) => {

    const updatedData = data.data.map((x) => {
      const session =  x.student_sessions.find(session => session.academic_session_id == payload.academic_session_id);
      return {
        ...x,
        student_session: session || null
      };
    });
    return { data: updatedData }
  }, [payload.academic_session_id])


  return useQuery({
    queryKey: ['students', payload],
    queryFn: () => fetchStudents(payload),
    enabled: !!payload,
    staleTime: Infinity,
    select: filterCallbackFn

  })
}
export function useStudent(id) {

  return useQuery({
    queryKey: ['students', { id }],
    queryFn: () => fetchStudentById(id),
    staleTime: Infinity
  })
}

