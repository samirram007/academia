import axiosClient from "../../../utils/axios-client";





export function fetchDailyCollectionReportService(payload) {
 const filterString=`from=${payload.from}&to=${payload.to}`
    return axiosClient.get(`/daily_collection_report?${filterString}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function fetchMonthlyFeeCollectionReportService(payload) {
    let filterString=`academic_session_id=${payload.academic_session_id}&academic_class_id=${payload.academic_class_id}`
    if(payload.section_id){
        filterString=`${filterString}&section_id=${payload.section_id}`
    }
console.log(filterString);
    return axiosClient
        .get(`/monthly_fee_collection_report?${filterString}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}