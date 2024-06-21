import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useAddressType } from '../../../hooks/queries';


export const AddressTypeSelect = ({ formik,  name,label,exclude }) => {

    const AddressTypeData = useAddressType();
    if (AddressTypeData.isLoading) return <Loader size={6} label={'Address Type'} />;

    return (

        <CustomSelect formik={formik} name={name??"address_type"}
        label={label??'Address Type'}
            options={AddressTypeData.data && AddressTypeData.data.data &&
                Object.entries(AddressTypeData.data.data).map(([ key, value ], index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
