import { useState } from 'react'

import EntryForm from './EntryForm'

import FormikEditFormModal from '@/components/form-components/FormikEditFormModal'

const Edit = ({ initialValues,setEntryId }) => {

  const [isOpen, setOpen] = useState(false)

  return (
    <>

      <button onClick={() => setOpen(true)}
        className="btn btn-outline btn-primary btn-sm btn-rounded ">
        Edit
      </button>
      {isOpen &&
        <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label={`Fee No: ${initialValues.fee_no}`}>

          <EntryForm
            initialValues={initialValues}
            entryMode={'edit'} />
        </FormikEditFormModal>
      }
    </>

  )
}

export default Edit

