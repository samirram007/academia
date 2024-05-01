import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useSchoolTypes } from '../../SchoolType/hooks/quaries';

export const SchoolTypeSelect = ({ formik,  name,label,exclude }) => {

    const SchoolTypeData = useSchoolTypes();
    if (SchoolTypeData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"school_type_id"}
        label={label??'SchoolTypeSelect'}
            options={SchoolTypeData.data && SchoolTypeData.data.data &&
                SchoolTypeData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
