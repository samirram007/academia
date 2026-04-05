
import { lazy, useState } from 'react';

const Breadcrumbs=lazy(()=>import('../../../components/Breadcrumbs'))

const EntryForm=lazy(()=>import('./EntryForm'))
const Create = () => {
const [entryMode,setEntryMode]=useState('create');

    const editData = {
        name: '',
        username: '',
        code: '',
        password: '',
        user_type: 'student',
        email: '',
        contact_no: '',
        status: 'active',
        emergency_contact_name: '',
        emergency_contact_no: '',
        birth_mark: '',
        medical_conditions: '',
        allergies: '',
        language: 'hi',
        nationality: 'indian',
        religion: 'hindu',
        caste: 'general',
        gender: 'male',
        dob: '',
        doj: '',
        aadhaar_no: '',
        pan_no: '',
        passport_no: '',
        bank_name: '',
        account_holder_name: '',
        bank_account_no: '',
        bank_ifsc: '',
        bank_branch: '',
        admission_no: '',
        admission_date: '',
        campus_id: 1,
        academic_session_id: 1,
        academic_class_id: 1,
        profile_document_id: 1,
        guardian:null

    }
    const initialValues = editData ?? {
        name: '',
        username: '',
        code: '',
        password: '',
        user_type: 'student',
        email: '',
        contact_no: '',
        status: 'active',
        emergency_contact_name: '',
        emergency_contact_no: '',
        birth_mark: '',
        medical_conditions: '',
        allergies: '',
        language: 'Hindi',
        nationality: 'Indian',
        religion: 'Hindu',
        caste: 'General',
        gender: 'Male',
        dob: '',
        doj: '',
        aadhaar_no: '',
        pan_no: '',
        passport_no: '',
        bank_name: '',
        account_holder_name: '',
        bank_account_no: '',
        bank_ifsc: '',
        bank_branch: '',
        admission_no: '',
        admission_date: '',
        campus_id: 1,
        academic_session_id: 1,
        academic_class_id: 1,
        profile_document_id: 1
    }



    return (
        <div className='w-full pb-8'>
            <div className='mb-4 border-b border-blue-200/60 pb-2 dark:border-slate-700'>
                <Breadcrumbs />
            </div>

            <EntryForm initialValues={initialValues} entryMode={entryMode} />
        </div>
    )
}


export default Create



