import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useGuardianType } from '../../../hooks/queries';


export const GuardianTypeSelect = ({ formik,  name,label,exclude }) => {

    const GuardianTypeData = useGuardianType();
    if (GuardianTypeData.isLoading) return <Loader />;
    console.log(GuardianTypeData)
    return (

        <CustomSelect formik={formik} name={name??"guardian_type"}
        label={label??'Guardian Type'}
            options={GuardianTypeData.data && GuardianTypeData.data.data &&
                Object.entries(GuardianTypeData.data.data).map(([ key, value ], index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
