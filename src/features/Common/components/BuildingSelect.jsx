import React from 'react';
import Loader from '../../../components/Loader';
import { useBuildings } from '../../Building/hooks/quaries';
import { CustomSelect } from './CustomSelect';

export const BuildingSelect = ({ formik, campus_id, name,label,exclude }) => {
    const CampusId=formik.values.campus_id??campus_id

    const BuildingData = useBuildings({campus_id:CampusId});
    if (BuildingData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"building_id"} label={label??'Building'}
            options={BuildingData.data && BuildingData.data.data &&
                BuildingData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
