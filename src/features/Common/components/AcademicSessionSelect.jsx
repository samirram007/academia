import React, { useEffect, useMemo } from 'react';
import Loader from '../../../components/Loader';
import { useAcademicSessions } from '../../AcademicSession/hooks/quaries';
import { CustomSelect } from './CustomSelect';
import LoadingSelect from './LoadingSelect';

export const AcademicSessionSelect = ({ formik, campus_id, name, label, exclude }) => {
    const CampusId = formik.values.campus_id ?? campus_id

    const AcademicSessionData = useAcademicSessions({ campus_id: CampusId });
    if (AcademicSessionData.isPending) {
        return (<LoadingSelect name="academic_session_id" label={'Academic Session'} />);
    }

    //   useEffect(() => {
    //     AcademicSessionData.data &&
    //       formik.setFieldValue('academic_session_id', AcademicSessionData.data.data.find(x=>x.is_current).id);

    //   }, []);
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
