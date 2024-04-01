import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useEducationBoards } from '../../EducationBoard/hooks/quaries';

export const EducationBoardSelect = ({ formik, campus_id, name,label,exclude }) => {
    const CampusId=formik.values.campus_id??campus_id

    const EducationBoardData = useEducationBoards({campus_id:CampusId});
    if (EducationBoardData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"education_board_id"}
        label={label??'Education Board'}
            options={EducationBoardData.data && EducationBoardData.data.data &&
                EducationBoardData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
