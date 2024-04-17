import React, { useState } from 'react'

import FormikEditFormModal from '../../../components/form-components/FormikEditFormModal'
import EntryForm from './EntryForm'
import DataTable from './DataTable'
import Create from './Create'
import Edit from './Edit'

const FeeTemplateDetails = ({ initialValues }) => {

  const [isOpen, setOpen] = useState(false)
  const [entryMode, setEntryMode] = useState('create')
  const [entryId, setEntryId] = useState(0)
const feeTemplateName = <span className='text-blue-400 '> <b>Fee Template</b>: {initialValues.name}</span>
  return (
    <>

      <button onClick={() => setOpen(true)}
        className="btn btn-outline btn-primary btn-sm btn-rounded ">
        Details
      </button>
      {isOpen &&
        <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label={feeTemplateName}>
          {
            entryId===0?
            <Create initialValues={initialValues} /> :
            <Edit initialValues={initialValues} entryId={entryId} setEntryId={setEntryId} />

          }

          <DataTable fee_template_id={initialValues.id} setEntryId={setEntryId}  />
        </FormikEditFormModal>
      }
    </>

  )
}



export default FeeTemplateDetails