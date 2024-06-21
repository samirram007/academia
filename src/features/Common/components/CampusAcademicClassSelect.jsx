import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useAcademicClasses, useCampusAcademicClasses } from '../../AcademicClass/hooks/queries';
import LoadingSelect from './LoadingSelect';


export const CampusAcademicClassSelect = ({ formik,  name, label, exclude }) => {
    const AcademicClassData = useCampusAcademicClasses();
    if (AcademicClassData.isLoading) return <Loader size={6} label={'Academic Class'} />
    return (

        <CustomSelect formik={formik} name="academic_class_id" label={label ?? 'Academic Class'}
            options={AcademicClassData.data && AcademicClassData.data.data &&
                AcademicClassData.data.data.map(({ id: key, name: value,campus }, index) => (
                    exclude && exclude === key ? null :
                        <option key={index} value={key}>{campus.code} : {value}</option>
                ))} />

    );

};
