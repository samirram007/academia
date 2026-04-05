import { useState } from 'react'


import FormikEditFormModal from '@/components/form-components/FormikEditFormModal'
import Create from './Create'
import DataTable from './DataTable'
import Edit from './Edit'

const ExpenseItem = ({ initialValues }) => {

  const [isOpen, setOpen] = useState(false)
  const [entryMode, setEntryMode] = useState('create')
  const [entryId, setEntryId] = useState(0)
const feeTemplateName = <span className='text-blue-400 '> <b>Fee Template</b>: {initialValues.name}</span>
  return (
    <>

      <button onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-600 dark:hover:text-white transition-colors ">
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



export default ExpenseItem