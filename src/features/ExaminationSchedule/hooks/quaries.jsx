import { useQuery } from "@tanstack/react-query"
import { fetchExaminationScheduleService, fetchExaminationSchedulesService } from "../services/apis"

export function useExaminationSchedules() {

      return useQuery({
      queryKey: ['examination_types'],
      queryFn:fetchExaminationSchedulesService,
      staleTime:1000,
    })
  }
  export function useExaminationSchedule(id) {
    return useQuery({
      queryKey: ['examination_types',id],
      queryFn: ()=>fetchExaminationScheduleService(id),
    })
  }

