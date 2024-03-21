import { useQuery } from '@tanstack/react-query'
import {
    fetchBuildings,   fetchFloor,  fetchFloors,  fetchRoom,
   fetchRooms,   fetchUser, fetchUsers } from '../services'

import { fetchEducationBoard, fetchEducationBoards } from '../services/education_boards-api'
import { fetchFee, fetchFees } from '../services/fees-api'
import { fetchFeeTemplate, fetchFeeTemplates } from '../features/FeeTemplate/services/apis'
import { fetchAddressType, fetchCaste, fetchGender, fetchGuardianType, fetchLanguage, fetchNationality, fetchReligion } from '../services/enums-api'




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

export function useSubjects() {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubjects,
  })
}
export function useSubject(id) {
  return useQuery({
    queryKey: ['subjects',id],
    queryFn: ()=>fetchSubject(id),
  })
}


export function useDepartments() {
  return useQuery({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
  })
}
export function useDepartment(id) {
  return useQuery({
    queryKey: ['department',id],
    queryFn: ()=>fetchDepartment(id),
  })
}

export function useDesignation(id) {
  return useQuery({
    queryKey: ['designation',id],
    queryFn: ()=>fetchDesignation(id),
  })
}
export function useDesignations() {
    return useQuery({
      queryKey: ['designations'],
      queryFn: fetchDesignations,

    })

}
export function useBuilding(id) {
  return useQuery({
    queryKey: ['building',id],
    queryFn: ()=>fetchBuilding(id),
  })
}
export function useBuildings() {
    return useQuery({
      queryKey: ['buildings'],
      queryFn: fetchBuildings,

    })

}
export function useFloor(id) {
  return useQuery({
    queryKey: ['floor',id],
    queryFn: ()=>fetchFloor(id),
  })
}
export function useFloors() {
    return useQuery({
      queryKey: ['floors'],
      queryFn: fetchFloors,
    })
}
export function useRoom(id) {
  return useQuery({
    queryKey: ['room',id],
    queryFn: ()=>fetchRoom(id),
  })
}
export function useRooms() {
    return useQuery({
      queryKey: ['rooms'],
      queryFn: fetchRooms,
    })
}
export function useEducationBoard(id) {
  return useQuery({
    queryKey: ['education_board',id],
    queryFn: ()=>fetchEducationBoard(id),
    staleTime:Infinity
  })
}
export function useEducationBoards() {
    return useQuery({
      queryKey: ['education_boards'],
      queryFn: fetchEducationBoards,
      staleTime:Infinity
    })
}
export function useGender() {
    return useQuery({
      queryKey: ['gender'],
      queryFn: fetchGender,
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

