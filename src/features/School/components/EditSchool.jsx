
import { useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import EntryForm from './EntryForm';

import Loader from '../../../components/Loader';
import { useParams } from 'react-router-dom';
import { useSchool } from '../hooks/queries';


const EditSchool = () => {

const { id } = useParams();
const [entryMode,setEntryMode]=useState('edit');
const {data:editData,isError, isLoading}=useSchool(id)


 if(isLoading){
    return <Loader/>
 }
 if(isError){
    return <div>Error...</div>
 }


    const initialValues = editData.data ?? {
        name: '',
        code: '',
        address_id: null,
        description:'',
        contact_no: '',
        email:'',
        website:'',
        establishment_date: '',
        logo_image_id:null,
        school_type_id:null,
        education_board_id:null,

    }



    return (
        <div className='pb-10 w-full'>
            <div className='row  flex flex-col md:flex-row justify-between gap-2 border-b-2 border-blue-300/10 pb-2 mb-2 '>
                <div className='flex flex-col gap-2 flex-1 text-3xl'>

                    <Breadcrumbs />
                </div>
                <div className='flex flex-row gap-2 flex-1'>

                </div>
                <div className='flex flex-row gap-2 justify-center flex-1 items-center'>

                </div>
            </div>
            <EntryForm initialValues={initialValues}
                entryMode={entryMode} />


        </div>
    )
}


export default EditSchool


