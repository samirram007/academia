import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { fetchPromotionsService } from '../services/apis';
import moment from 'moment';

const PromotionContext = createContext();

export const usePromotionContext = () => {
    return useContext(PromotionContext);
};

export const PromotionProvider = ({ children }) => {

    const initialValues = {
        name: '',
        code: '',
        campus_id: 1,
        academic_session_id: moment(new Date()).format('YYYY'),
        academic_class_id: 10399,
        section_id: 1,
    };
    const initialFilterValues = {
        academic_session_id: initialValues.academic_session_id,
        academic_class_id: initialValues.academic_class_id,
        section_id: initialValues.section_id,
    };
    const [filters, setFilters] = useState(initialFilterValues);

    const {
        data: previousClassData,
        refetch: refetchPreviousClassData,
        isRefetching: isRefetchingPreviousClassData,
        isFetching: isFetchingPreviousClassData,
        isError: isErrorPreviousClassData,
    } = useQuery({
        queryKey: ['promotions', filters],
        queryFn: () => fetchPromotionsService(filters),
        enabled: !!filters, // Disable automatic fetching
        staleTime: 1000*60*5,
        retryDelay: 1000*60*5,
        retry: 2,
    });
    // console.log("previousClassData",previousClassData)
    const mData = previousClassData?.data ?? [];
    //  console.log("mData",mData)
    const xData = useMemo(() => [...mData], [mData]);
    //  console.log("xData",xData)
    const refetch = useCallback(async (newFilters) => {
        setFilters(newFilters);
        await refetchPreviousClassData();
    }, [refetchPreviousClassData]);

    return (
        <PromotionContext.Provider value={{
            previousClassData,
            xData,
            isFetchingPreviousClassData,
            isRefetchingPreviousClassData,
            isErrorPreviousClassData,
            refetch,
            initialValues,
            initialFilterValues,

        }}>
            {children}
        </PromotionContext.Provider>
    );
};
