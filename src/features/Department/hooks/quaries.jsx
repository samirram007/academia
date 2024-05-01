import { useQuery } from "@tanstack/react-query"
import { fetchDepartmentService, fetchDepartmentsService } from "../services/apis"

export function useDepartments() {

      return useQuery({
      queryKey: ['departments'],
      queryFn:fetchDepartmentsService,
      staleTime:1000,
    })
  }
  export function useDepartment(id) {
    return useQuery({
      queryKey: ['departments',id],
      queryFn: ()=>fetchDepartmentService(id),
    })
  }

