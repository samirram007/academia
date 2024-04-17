import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useSubjectType } from '../../../hooks/queries';


export const SubjectTypeSelect = ({ formik,  name,label,exclude }) => {

    const SubjectTypeData = useSubjectType();
    if (SubjectTypeData.isLoading) return <Loader size={16}/>;
    return (

        <CustomSelect formik={formik} name={name??"subject_type"}
        label={label??'Subject Type'}
            options={SubjectTypeData.data && SubjectTypeData.data.data &&
                Object.entries(SubjectTypeData.data.data).map(([ key, value ], index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
