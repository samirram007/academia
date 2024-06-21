import React, { useEffect, useMemo, useState } from 'react';
import Loader from '../../../components/Loader';
import { useAcademicSessions } from '../../AcademicSession/hooks/quaries';
import { CustomSelect } from './CustomSelect';


export const AcademicSessionSelect = ({ formik,   name, label, exclude,is_current }) => {

// const [defaultValue,setDefaultValue]=useState(formik.values.academic_session_id)
// console.log('ic',is_current)
    const AcademicSessionData = useAcademicSessions({is_current});
    if (AcademicSessionData.isPending) return <Loader size={6} label={'Academic Session'} />
    return (

        <CustomSelect formik={formik}
            name={name ?? "academic_session_id"} label={label ?? 'Academic Session'}
            options={AcademicSessionData.data && AcademicSessionData.data.data &&

                AcademicSessionData.data.data.map(({ id: key, session: value,is_current }, index) => (

                    exclude && exclude === key ? null :
                        <option key={index} value={key} >{value}</option>
                ))} />

    );

};
