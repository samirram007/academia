import { useState } from 'react'

import FormikEditFormModal from '@/components/form-components/FormikEditFormModal'
import Create from './Create'
import DataTable from './DataTable'
import Edit from './Edit'

const FeeTemplateItem = ({ initialValues }) => {

  const [isOpen, setOpen] = useState(false)
  const [entryMode, setEntryMode] = useState('create')
  const [entryId, setEntryId] = useState(0)
  const feeTemplateName = <span> <b>Fee Template</b>: {initialValues.name}</span>
  return (
    <>

      <button onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors">
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



export default FeeTemplateItem