import { useQuery } from "@tanstack/react-query"
import { fetchSubjectGroupService, fetchSubjectGroupsService } from "../services/apis"

export function useSubjectGroups() {

      return useQuery({
      queryKey: ['subject_groups'],
      queryFn:fetchSubjectGroupsService,
      staleTime:1000,
    })
  }
  export function useSubjectGroup(id) {
    return useQuery({
      queryKey: ['subject_groups',id],
      queryFn: ()=>fetchSubjectGroupService(id),
    })
  }

