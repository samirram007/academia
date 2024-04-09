import { useQuery } from '@tanstack/react-query'
import {
    fetchBuildings,   fetchFloor,  fetchFloors,  fetchRoom,
   fetchRooms,   fetchUser, fetchUsers } from '../services'



import { fetchAddressType, fetchCaste, fetchGender, fetchGuardianType, fetchLanguage, fetchNationality, fetchReligion, fetchRoomType } from '../services/enums-api'




export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}
export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  })
}

export function useGender() {
    return useQuery({
      queryKey: ['gender'],
      queryFn: fetchGender,
      staleTime:Infinity
    })
}
export function useSchoolType() {
    return useQuery({
      queryKey: ['school_type'],
      queryFn: fetchSchoolType,
      staleTime:Infinity
    })
}
export function useNationality() {
    return useQuery({
      queryKey: ['nationality'],
      queryFn: fetchNationality,
      staleTime:Infinity
    })
}
export function useLanguage() {
    return useQuery({
      queryKey: ['language'],
      queryFn: fetchLanguage,
      staleTime:Infinity
    })
}
export function useGuardianType() {
    return useQuery({
      queryKey: ['guardian_type'],
      queryFn: fetchGuardianType,
      staleTime:Infinity
    })
}
export function useRoomType() {
    return useQuery({
      queryKey: ['room_type'],
      queryFn: fetchRoomType,
      staleTime:Infinity
    })
}
export function useAddressType() {
    return useQuery({
      queryKey: ['address_type'],
      queryFn: fetchAddressType,
      staleTime:Infinity
    })
}
export function useReligion() {
    return useQuery({
      queryKey: ['religion'],
      queryFn: fetchReligion,
      staleTime:Infinity
    })
}
export function useCaste() {
    return useQuery({
      queryKey: ['caste'],
      queryFn: fetchCaste,
      staleTime:Infinity
    })
}

