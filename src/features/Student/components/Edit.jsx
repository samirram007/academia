
import { useParams } from 'react-router-dom';


import { lazy, useState } from 'react';

import { useStudent } from '../hooks/queries';
const Breadcrumbs=lazy(()=>import('../../../components/Breadcrumbs'))

const EntryForm=lazy(()=>import('./EntryForm'))



const Edit = () => {
    const { id } = useParams();
    const [entryMode,setEntryMode]=useState('edit');
    const {data:editData,isError, isLoading}=useStudent(id)


     if(isLoading){
        return <div>Loading...</div>
     }
     if(isError){
        return <div>Error...</div>
     }

    const initialValues = editData.data ?? {
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
        profile_document_id: 1,
        addresses: [],
    }


    return (
        <div className='container-flex md-container max-h-full '>
            <div className='row  flex flex-col md:flex-row justify-between gap-2 border-b-2 border-blue-300/10 pb-2 mb-2 '>
                <div className='flex flex-col gap-2 flex-1 text-3xl'>
                    {/* {'Edit Student'} */}
                    <Breadcrumbs />
                </div>
                <div className='flex flex-row gap-2 flex-1'>

                </div>
                <div className='flex flex-row gap-2 justify-center flex-1 items-center'>

                </div>
            </div>
            <div className='overflow-y-auto  max-h-[75vh] 2xl:max-h-[67vh]'>

            <EntryForm initialValues={initialValues} entryMode={entryMode}/>
            </div>


        </div>
    )
}


export default Edit

