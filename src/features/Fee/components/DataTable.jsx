import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'

import Filter from './Filter';

import { useNavigate } from 'react-router-dom';

import { useFees } from '../hooks/quaries';
import CreateFee from './Create';
import Edit from './Edit';
import Delete from './Delete';
import FeeTable from './FeeTable';



const initialValues = {
  fee_no: '',
  fee_date: new Date(),
  academic_session_id: 1,
  campus_id: 1,
  user_id: null,
  total_amount: 0,
  paid_amount: 0,
  balance_amount: 0,
  payment_mode: 'CASH'
}
const initialFilterValues = {
  campus_id: initialValues.campus_id,
  academic_session_id: initialValues.academic_session_id,
   from:new Date().toISOString().split('T')[0],
   to:new Date().toISOString().split('T')[0]
}
// console.log(initialFilterValues)
const DataTable = () => {

  // const formattedDate = new Date().toString('yyyy-MM-dd');

  // console.log('Date',formattedDate);
  const FeeData = useFees(initialFilterValues)
  const navigate = useNavigate()

  const mData = FeeData.data?.data ?? [];
  const data = useMemo(() => [...mData], [mData]);
console.log(data);
  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      visible: false,
      size: 50,

    },
    {
      header: "Fee No",
      accessorKey: "fee_no",

    },
    {
      header: "Date",
      accessorKey: "fee_date",
      cell: info =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),

    },
    {
      header: "Campus",
      accessorKey: "campus.name",
    },

    {
      header: "Session",
      accessorKey: "academic_session.session",

    },

    {
      header: "Amount",
      accessorKey: "total_amount",

    },

    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {
        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
            {/* <Print initialValues={row.original} /> */}
            <Edit initialValues={row.original} />
            <Delete initialValues={row.original} />

          </div>
        )
      }
    }

  ]
  return (


    <FeeTable
      data={data}
      columns={columns}
      createForm={<CreateFee modal={true} />}
      createFormTitle={'Fee No: [new]'}
      FeeData={FeeData}
      initialFilterValues={initialFilterValues}

    />

  )
}

export default DataTable
