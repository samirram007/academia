import React from 'react'
import BasicTable from '../../../components/tables/BasicTable'

import { useMemo } from 'react';
import { DateTime } from 'luxon'

import { useNavigate } from 'react-router-dom';
import { useStudents } from '../hooks/queries';
import Filter from './Filter';



const initialValues = {
  academic_session_id: 1,
  academic_class_id: 1,
  campus_id: 1,
  name: '',
  is_active: false
}
const initialFilterValues = {
  campus_id: initialValues.campus_id,
  academic_class_id: initialValues.academic_class_id,
  academic_session_id: initialValues.academic_session_id,
}

const DataTable = () => {
  const StudentsData = useStudents(initialFilterValues)
  const navigate = useNavigate()
  const createRoute = `/students/create`

  const mData = StudentsData.data?.data ?? [];

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
      size: 300,
    },
    {
      header: "Type",
      accessorKey: "user_type",
      size: 300,
    },
    {
      header: "Email",
      accessorKey: "email",
      size: 200,
    },
    {
      header: 'DOB',
      accessorKey: 'dob',
      cell: info =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {
        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
            <button onClick={() => { navigate(`/students/info/${row.original.id}`) }}
              className="btn btn-outline btn-primary btn-sm btn-rounded ">
              Info..
            </button>
            <button onClick={() => { navigate(`/students/edit/${row.original.id}`) }}
              className="btn btn-outline btn-primary btn-sm btn-rounded ">
              Edit
            </button>
            <button onClick={() => { deleteUserData(row.original.id) }}
              className="btn btn-outline btn-primary btn-sm btn-rounded  ">
              Delete
            </button>
          </div>
        )
      }
    }

  ]

  const deleteUserData = (id) => {
    navigate(`/students/delete/${id}`)
  }
  return (
    <BasicTable data={data} columns={columns}
      createRoute={createRoute}
      filter={
        <Filter StudentsData={StudentsData}
          initialFilterValues={initialFilterValues} />
      } />
  )
}

export default DataTable
