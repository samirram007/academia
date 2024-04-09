import React from 'react';
import Loader from '../../../components/Loader';
import { useRooms } from '../../Room/hooks/quaries';
import { CustomSelect } from './CustomSelect';

export const RoomSelect = ({ formik, campus_id, name,label,exclude }) => {
    const CampusId=formik.values.campus_id??campus_id

    const RoomData = useRooms({campus_id:CampusId});
    if (RoomData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"room_id"} label={label??'Room'}
            options={RoomData.data && RoomData.data.data &&
                RoomData.data.data.map(({ id: key, session: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
