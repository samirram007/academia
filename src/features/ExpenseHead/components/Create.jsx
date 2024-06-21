
import { useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import EntryForm from './EntryForm';


const Create = ({ modal }) => {
    const [entryMode, setEntryMode] = useState('create');

    const editData = {
        name: '',
        expense_group_id:1
    }

    const initialValues = editData ?? {
        name: '',
        expense_group_id:1
    }



    return (
        <div className='pb-10 w-full'>
            {
                !modal &&

                <div className='row  flex flex-col md:flex-row justify-between gap-2 border-b-2 border-blue-300/10 pb-2 mb-2 '>
                    <div className='flex flex-col gap-2 flex-1 text-3xl'>

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


export default Create



