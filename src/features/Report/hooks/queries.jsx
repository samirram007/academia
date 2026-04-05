import { useQuery } from "@tanstack/react-query";
import { fetchDailyCollectionReportService, fetchExamFeesCollectionReportService, fetchMonthlyFeeCollectionReportService } from "../services/apis";

export function useDailyCollectionReport(payload) {
    return useQuery({
      queryKey: ['daily_collection_report'],
      queryFn: ()=>fetchDailyCollectionReportService(payload),
      staleTime:Infinity,

    })
  }
export function useMonthlyFeeCollectionReport(payload) {

    return useQuery({
      queryKey: ['monthly_fee_collection_report',payload],
      queryFn: ()=>fetchMonthlyFeeCollectionReportService(payload),
      staleTime:Infinity,

    })
  }
export function useExamFeesCollectionReport(payload) {

  return useQuery({
    queryKey: ['exam_fees_collection_report', payload],
    queryFn: () => fetchExamFeesCollectionReportService(payload),
    staleTime: Infinity,

  })
}