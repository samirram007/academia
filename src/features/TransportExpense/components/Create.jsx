import { Breadcrumbs } from '@mui/material';
import React, { useState } from 'react'
import EntryForm from './EntryForm';
import moment from 'moment';

 const Create = ({ modal }) => {
  const [entryMode, setEntryMode] = useState('create');

  const editData = {
    expense_no:'new',
    expense_date:    moment(new Date()).format('YYYY-MM-DD'),
    academic_session_id: 1,
    campus_id: 1,
    user_id: null,
    total_amount: 0,
    paid_amount: 0,
    balance_amount: 0,
    payment_mode:'CASH',
    transport_expense_items:[]

  }

  const initialValues = editData ?? {
    expense_no:'new',
    expense_date:     moment(new Date()).format('YYYY-MM-DD'),
    academic_session_id: 1,
    campus_id: 1,
    user_id: null,
    total_amount: 0,
    paid_amount: 0,
    balance_amount: 0,
    payment_mode:'CASH',
    transport_expense_items:[]
  }



  return (
      <div className='pb-10 w-full'>
          {
              !modal &&

              <div className='row  flex flex-col md:flex-row justify-between gap-2 border-b-2 border-blue-300/10 pb-2 mb-2 '>
                  <div className='flex flex-col gap-2 flex-1 text-3xl'>
                      {/* {'New FeeHead'} */}
                      <Breadcrumbs />
                  </div>
                  <div className='flex flex-row gap-2 flex-1'>

                  </div>
                  <div className='flex flex-row gap-2 justify-center flex-1 items-center'>

                  </div>
              </div>
          }

          <EntryForm
          initialValues={initialValues}
          entryMode={entryMode}
           />


      </div>
  )
}


export default Create