import React, { useState } from 'react'



import FormikEditFormModal from '../../../components/form-components/FormikEditFormModal'
import EntryForm from './EntryForm';

const DeleteSchool = ({ initialValues }) => {
console.log("DELETE",initialValues);
  const [isOpen, setOpen] = useState(false)

  return (
    <>

      <button onClick={() => setOpen(true)}
        className="btn btn-outline btn-primary btn-sm btn-rounded  ">
        Delete
      </button>
      {isOpen &&
        <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label="Delete School">

          <EntryForm
            initialValues={initialValues}
            entryMode={'delete'} />
        </FormikEditFormModal>
      }
    </>

  )
}

export default DeleteSchool


