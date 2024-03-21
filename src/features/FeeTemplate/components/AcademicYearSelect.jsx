import React from 'react';
import Loader from '../../../components/Loader';
import { useAcademicYears } from '../../AcademicYear/hooks/quaries';
import { CustomSelect } from './CustomSelect';

export const AcademicYearSelect = ({ formik, campus_id }) => {
    const AcademicYearData = useAcademicYears(campus_id);
    if (AcademicYearData.isLoading) return <Loader />;
    return (
        AcademicYearData.data &&
        <CustomSelect formik={formik} name="academic_year_id" label={'Academic Year'}
            options={AcademicYearData.data.data &&
                AcademicYearData.data.data.map(({ id: key, year: value }, index) => (
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
