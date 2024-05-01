import React, { useState } from 'react'

import EntryForm from './EntryForm'

import FormikEditFormModal from '../../../components/form-components/FormikEditFormModal'

const EditAcademicSession = ({ initialValues }) => {

  const [isOpen, setOpen] = useState(false)

  return (
    <>

      <button onClick={() => setOpen(true)}
        className="btn btn-outline btn-primary btn-sm btn-rounded ">
        Edit
      </button>
      {isOpen &&
        <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label="Edit Academic Session">

          <EntryForm
            initialValues={initialValues}
            entryMode={'edit'} />
        </FormikEditFormModal>
      }
    </>

  )
}

export default EditAcademicSession

