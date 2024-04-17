
import React, {   useState } from 'react'

import * as Yup from "yup";


import Breadcrumbs from '../../../components/Breadcrumbs';

import EntryForm from './EntryForm';
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Session is required"),
})



const CreateSchool = ({ modal }) => {


    const [entryMode, setEntryMode] = useState('create');

    const editData = {
        name: '',
        code: '',
        email: '',
        address_id: null,
        description:'',
        contact_no: '',
        website:'',
        establishment_date:null,
        logo_image_id:null,
        school_type_id:null,
        education_board_id:null,





    }

    const initialValues = editData ?? {
      name: '',
      code:'',
      education_board_id:'',
      address_id:'',
      contact_no:'',
      email:'',
      website:'',
      establishment_date:'',
      school_type_id:'',
      logo_image_id:''
    }



    return (
        <div className='pb-10'>
            {
                !modal &&
                <div className='row  flex flex-col md:flex-row justify-between gap-2 border-b-2 border-blue-300/10 pb-2 mb-2 '>
                    <div className='flex flex-col gap-2 flex-1 text-3xl'>
                        {/* {'Create Academic Session'} */}
                        <Breadcrumbs />
                    </div>
                    <div className='flex flex-row gap-2 flex-1'>

                    </div>
                    <div className='flex flex-row gap-2 justify-center flex-1 items-center'>

                    </div>

                </div>
            }
            <EntryForm
                initialValues={initialValues}
                entryMode={entryMode}
            />

        </div>
    )
}


export default CreateSchool