import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useTransports } from '../../Transport/hooks/quaries';



export const TransportSelect = ({ formik, name, label, exclude }) => {


    const TransportData = useTransports();
    if (TransportData.isLoading) return <Loader size={6} label={'Transport'} />

    return (

        <CustomSelect formik={formik} name={name ?? "transport_id"}
            label={label ?? 'Transport'}
            options={TransportData.data && TransportData.data.data &&
                TransportData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude === key ? null :
                        <option key={index} value={key}>{value}</option>
                ))} />

    );

};
