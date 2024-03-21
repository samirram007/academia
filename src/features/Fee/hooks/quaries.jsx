
export function useFees() {
    return useQuery({
      queryKey: ['fees'],
      queryFn: fetchFees,
    })
  }
  export function useFee(id) {
    return useQuery({
      queryKey: ['fees',id],
      queryFn: ()=>fetchFee(id),
    })
  }
