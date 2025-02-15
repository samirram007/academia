import { useState } from 'react'

import FormikEditFormModal from '@/components/form-components/FormikEditFormModal'
import EntryForm from './EntryForm'



const Edit = ({ initialValues, setEntryId }) => {

  const [isOpen, setOpen] = useState(false)

  return (
    <>

      <button onClick={() => setOpen(true)}
        className="btn btn-outline btn-primary btn-sm btn-rounded ">
        Edit
      </button>
      {isOpen &&
        <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label={`Examination No: ${initialValues.examination_no}`}>

          <EntryForm
            initialValues={initialValues}
            entryMode={'edit'} />
        </FormikEditFormModal>
      }
    </>

  )
}

export default Edit

