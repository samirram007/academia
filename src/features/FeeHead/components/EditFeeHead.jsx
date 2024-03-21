
import { useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import EntryForm from './EntryForm';
import { useParams } from 'react-router-dom';
import { useFeeHead } from '../hooks/queries';


const EditFeeHead = () => {
  const { id } = useParams();
  const [entryMode,setEntryMode]=useState('edit');
  const {data:editData,isError, isLoading}=useFeeHead(id)


   if(isLoading){
      return <div>Loading...</div>
   }
   if(isError){
      return <div>Error...</div>
   }

    const initialValues = editData.data ?? {
        name: '',
    }



    return (
        <div className='pb-10 w-full'>
            <div className='row  flex flex-col md:flex-row justify-between gap-2 border-b-2 border-blue-300/10 pb-2 mb-2 '>
                <div className='flex flex-col gap-2 flex-1 text-3xl'>
                    {'New FeeHead'}
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


export default EditFeeHead
