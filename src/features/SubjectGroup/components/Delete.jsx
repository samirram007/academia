import React, { useState } from 'react'

import EntryForm from './EntryForm'

import FormikEditFormModal from '../../../components/form-components/FormikEditFormModal'

const Delete = ({ initialValues }) => {

  const [isOpen, setOpen] = useState(false)

  return (
    <>

      <button onClick={() => setOpen(true)}
        className="btn btn-outline btn-primary btn-sm btn-rounded  ">
        Delete
      </button>
      {isOpen &&
        <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label="Delete Department">

          <EntryForm
            initialValues={initialValues}
            entryMode={'delete'} />
        </FormikEditFormModal>
      }
    </>

  )
}

export default Delete

