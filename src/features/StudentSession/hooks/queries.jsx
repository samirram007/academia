import { useQuery } from "@tanstack/react-query"
import { fetchStudentSessionsByStudentId, fetchStudentSessionsFeesByStudentSessionId } from "../services/apis"


 export function useStudentSessions(payload) {
    return useQuery({
      queryKey: ['student_sessions',payload],
      queryFn: ()=>fetchStudentSessionsByStudentId(payload),
      staleTime:Infinity
    })
  }
 export function useStudentSessionFees(payload) {

    return useQuery({
      queryKey: ['student_session_fees',payload],
      queryFn: ()=>fetchStudentSessionsFeesByStudentSessionId(payload),
      staleTime:Infinity
    })
  }
