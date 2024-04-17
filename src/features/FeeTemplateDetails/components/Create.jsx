
import React from 'react'
import EntryForm from './EntryForm'
import { useFeeTemplateDetail } from '../hooks/quaries'

const Create = ({ initialValues }) => {

  const initValues =   {
      name: '',
      sort_index: 1,
      fee_template_id: initialValues.id,
      fee_head_id: '',
      amount: 0,
      is_customizable: false,
      keep_periodic_details: false,
      is_active: true
    }

  return (
    <>
 <div className='border-2 border-blue-400 rounded-lg  '>
      <EntryForm
        initialValues={initValues}
        entryMode={'create'}  />
        </div>
    </>
  )
}

export default Create