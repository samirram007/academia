import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useAcademicClasses } from '../../AcademicClass/hooks/queries';

export const AcademicClassSelect = ({ formik, campus_id }) => {
    const AcademicClassData = useAcademicClasses({campus_id});
    if (AcademicClassData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name="academic_class_id" label={'Academic Class'}
            options={ AcademicClassData.data && AcademicClassData.data.data &&
                AcademicClassData.data.data.map(({ id: key, name: value }, index) => (
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
