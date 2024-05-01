import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useSchools } from '../../School/hooks/queries';


export const SchoolSelect = ({ formik, name,label,exclude }) => {


    const SchoolData = useSchools();
    if (SchoolData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"school_id"}
        label={label??'School'}
            options={SchoolData.data && SchoolData.data.data &&
                SchoolData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
