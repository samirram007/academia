import React, { useState } from 'react'

import EntryForm from './EntryForm'

import FormikEditFormModal from '../../../components/form-components/FormikEditFormModal'

const DeleteEducationBoard = ({ initialValues }) => {

  const [isOpen, setOpen] = useState(false)

  return (
    <>

      <button onClick={() => setOpen(true)}
        className="btn btn-outline btn-primary btn-sm btn-rounded  ">
        Delete
      </button>
      {isOpen &&
        <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label="Delete Academic Session">

          <EntryForm
            initialValues={initialValues}
            entryMode={'delete'} />
        </FormikEditFormModal>
      }
    </>

  )
}

export default DeleteEducationBoard
