import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useTransportTypes } from '../../TransportType/hooks/quaries';



export const TransportTypeSelect = ({ formik, name,label,exclude }) => {


    const TransportTypeData = useTransportTypes();
    if (TransportTypeData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"transport_type_id"}
        label={label??'Transport Type'}
            options={TransportTypeData.data && TransportTypeData.data.data &&
                TransportTypeData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
