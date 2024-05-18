import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'
import BasicTable from '../../../components/tables/BasicTable';
import Filter from './Filter';

import { useNavigate } from 'react-router-dom';

import { useExpenses } from '../hooks/quaries';
import CreateExpense from './Create';
import Edit from './Edit';
import Delete from './Delete';
import ExpenseItem from '../../ExpenseItem/components/ExpenseItem';


const initialValues = {
  academic_session_id: 1,
  academic_class_id: 1,
  campus_id: 1,
  name:'',
  is_active:false
}
const initialFilterValues = {
  campus_id: initialValues.campus_id,
  academic_class_id:initialValues.academic_class_id,
  academic_session_id:initialValues.academic_session_id,
}
const DataTable = () => {

  const ExpenseData = useExpenses(initialFilterValues)
  const navigate = useNavigate()

  const mData = ExpenseData.data?.data ?? [];
  const data = useMemo(() => [...mData], [mData]);

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      visible: false,
      size: 50,

    },
    {
      header: "Name",
      accessorKey: "name",

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
      header: "Class",
      accessorKey: "academic_class.name",

    },

    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {
        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
          <ExpenseItem  initialValues={row.original} />
          <Edit  initialValues={row.original} />
          <Delete initialValues={row.original} />

         </div>
        )
      }
    }

  ]

  return (
    <BasicTable
    data={data}
    columns={columns}
    createForm={<CreateExpense modal={true}/>}
    createFormTitle={'New Fee Template'}
    filter={
        <Filter ExpenseData={ExpenseData}
        initialFilterValues={initialFilterValues} />
      }
    />
  )
}

export default DataTable
