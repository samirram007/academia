
import { useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import EntryForm from './EntryForm';


const Create = () => {
const [entryMode,setEntryMode]=useState('create');

    const editData = {
        name: '',
        username: '',
        code: '',
        password: '',
        user_type: 'teacher',
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
        profile_document_id: 1,
        guardian:null

    }
    const initialValues = editData ?? {
        name: '',
        username: '',
        code: '',
        password: '',
        user_type: 'teacher',
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
        profile_document_id: 1
    }



    return (
        <div className='pb-10 w-full'>
            <div className='row  flex flex-col md:flex-row justify-between gap-2 border-b-2 border-blue-300/10 pb-2 mb-2 '>
                <div className='flex flex-col gap-2 flex-1 text-3xl'>
                    {/* {'New Teacher'} */}
                    <Breadcrumbs />
                </div>
                <div className='flex flex-row gap-2 flex-1'>

                </div>
                <div className='flex flex-row gap-2 justify-center flex-1 items-center'>

                </div>
            </div>
            <EntryForm initialValues={initialValues} entryMode={entryMode}/>


        </div>
    )
}


export default Create



