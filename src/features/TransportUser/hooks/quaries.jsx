import { useQuery } from "@tanstack/react-query"
import { fetchTransportUserService, fetchTransportUsersService, fetchUserSearchService } from "../services/apis"

export function useTransportUsers(payload) {

      return useQuery({
      queryKey: ['transport_users',{transport_id:payload.transport_id}],
      queryFn:()=>fetchTransportUsersService(payload),
      staleTime:1000,
    })
  }
export function useUserSearch(payload) {
// console.log(payload)
      return useQuery({
      queryKey: ['search_users',{searchText:payload.searchText}],
      queryFn:()=>fetchUserSearchService(payload),
      staleTime:1000,
    })
  }
  export function useTransportUser(id) {
    return useQuery({
      queryKey: ['transport_users',id],
      queryFn: ()=>fetchTransportUserService(id),
    })
  }

