import React from 'react';
import Loader from '../../../components/Loader';
import { useAcademicClasses } from '../../AcademicClass/hooks/queries';
import { CustomSelect } from './CustomSelect';

export const AcademicClassSelect = ({ formik, campus_id }) => {
    const AcademicClassData = useAcademicClasses(campus_id);
    if (AcademicClassData.isLoading) return <Loader />;
    return (
        AcademicClassData.data &&
        <CustomSelect formik={formik} name="academic_class_id" label={'Academic Class'}
            options={AcademicClassData.data.data &&
                AcademicClassData.data.data.map(({ id: key, name: value }, index) => (
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
