import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useSubjectGroups } from '../../SubjectGroup/hooks/quaries';



export const SubjectGroupSelect = ({ formik, name,label,exclude }) => {


    const SubjectGroupData = useSubjectGroups();
    if (SubjectGroupData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"subject_group_id"}
        label={label??'SubjectGroup'}
            options={SubjectGroupData.data && SubjectGroupData.data.data &&
                SubjectGroupData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
