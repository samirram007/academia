import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useSections } from '../../Section/hooks/quaries';



export const SectionSelect = ({ formik, name,label,exclude }) => {


    const SectionData = useSections();
    if (SectionData.isLoading)  return <Loader size={6} label={'Academic Class'} />
    return (

        <CustomSelect formik={formik} name={name??"section_id"}
        label={label??'Section'}
            options={SectionData.data && SectionData.data.data &&
                SectionData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
