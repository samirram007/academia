import { useState } from 'react'

import EntryForm from './EntryForm'

import FormikEditFormModal from '@/components/form-components/FormikEditFormModal'

const DeleteSchoolType = ({ initialValues }) => {

  const [isOpen, setOpen] = useState(false)

  return (
    <>

      <button onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold border border-red-400 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white transition-colors  ">
        Delete
      </button>
      {isOpen &&
        <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label="Delete School Type">

          <EntryForm
            initialValues={initialValues}
            entryMode={'delete'} />
        </FormikEditFormModal>
      }
    </>

  )
}

export default DeleteSchoolType

