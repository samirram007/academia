import React from 'react';
import Loader from '../../../components/Loader';
import { useAcademicSessions } from '../../AcademicSession/hooks/quaries';
import { CustomSelect } from './CustomSelect';

export const AcademicSessionSelect = ({ formik, campus_id }) => {
    const AcademicSessionData = useAcademicSessions({campus_id});
    if (AcademicSessionData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name="academic_session_id" label={'Academic Session'}
            options={AcademicSessionData.data && AcademicSessionData.data.data &&
                AcademicSessionData.data.data.map(({ id: key, session: value }, index) => (
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
