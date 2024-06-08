import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useAcademicClasses } from '../../AcademicClass/hooks/queries';
import LoadingSelect from './LoadingSelect';


export const AcademicClassSelect = ({ formik, campus_id, name, label, exclude  }) => {
    const AcademicClassData = useAcademicClasses({campus_id});
    if (AcademicClassData.isLoading)
    {
        return (
            <>

            <LoadingSelect name="academic_class_id" label={'Academic Class'}/>
            </>
    )
    }
    return (

        <CustomSelect formik={formik} name="academic_class_id" label={label ?? 'Academic Class'}
            options={ AcademicClassData.data && AcademicClassData.data.data &&
                AcademicClassData.data.data.map(({ id: key, name: value }, index) => (
                    exclude && exclude === key ? null :
                        <option key={index} value={key}>{value}</option>
                ))} />

    );

};
