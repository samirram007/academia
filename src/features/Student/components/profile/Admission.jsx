import { useState } from 'react';

import FormikEnrollmentFormModal from '@/components/form-components/FormikEnrollmentFormModal';
import Enrollment from './Enrollment';

const Admission = ({ data, academicSessions,selectedStudentSession }) => {
    const [entryMode, setEntryMode] = useState('create');
    const  [isOpen, setOpen]  = useState(false)


    return (
        <>
            {data.admission.academic_class &&
                <div className='bg-green-500 font-semibold text-sm px-2 rounded-2xl shadow-md border-2
                     border-white/20 text-green-900 flex flex-row items-center mr-2'>
                    Class: {'' + data.admission.academic_class.name}
                </div>
            }

            <button onClick={() => { setOpen(true) }} className='btn btn-sm   btn-error btn-rounded shadow-lg'>Process Enrollment</button>
            {
                isOpen &&
                <>
                    <FormikEnrollmentFormModal label={'Enrollment'} isOpen={isOpen} setOpen={setOpen}>
                        <Enrollment data={data} entryMode={entryMode} selectedStudentSession={selectedStudentSession} enrollmentType={1}  />
                    </FormikEnrollmentFormModal>
                </>
            }
        </>
    )
}

export default Admission
