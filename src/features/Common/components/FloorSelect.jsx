import React from 'react';
import Loader from '../../../components/Loader';
import { useFloors } from '../../Floor/hooks/quaries';
import { CustomSelect } from './CustomSelect';

export const FloorSelect = ({ formik, building_id, name,label,exclude }) => {
    const BuildingId=formik.values.building_id??building_id

    const FloorData = useFloors({building_id:BuildingId});
    if (FloorData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"floor_id"} label={label??'Floor'}
            options={FloorData.data && FloorData.data.data &&
                FloorData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
