import React, { useEffect, useMemo, useState } from 'react';
import Loader from '../../../components/Loader';
import { useAcademicSessions } from '../../AcademicSession/hooks/quaries';
import { CustomSelect } from './CustomSelect';
import LoadingSelect from './LoadingSelect';

export const AcademicSessionSelect = ({ formik,   name, label, exclude }) => {

// const [defaultValue,setDefaultValue]=useState(formik.values.academic_session_id)
    const AcademicSessionData = useAcademicSessions();
    if (AcademicSessionData.isPending) {
        return (<LoadingSelect name="academic_session_id" label={'Academic Session'} />);
    }


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
