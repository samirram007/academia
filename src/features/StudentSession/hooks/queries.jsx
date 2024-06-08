import { useQuery } from "@tanstack/react-query"
import { fetchGenerateRollNo, fetchStudentSessionsByStudentId, fetchStudentSessionsFeesByStudentSessionId } from "../services/apis"


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
      staleTime:1000*60*4,
      refetchOnWindowFocus: false,
      enabled:!!payload
    })
  }

  export async function useGenerateRollNo(payload) {
    console.log(payload)
    const data=await fetchGenerateRollNo(payload)
    //console.log(data);
    if(!data){throw new Error('Error in generating roll no')}
    return data
  }

