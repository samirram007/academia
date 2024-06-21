import React from 'react'
import FilterTable from '../../../components/tables/FilterTable'

import { useMemo } from 'react';
import { DateTime } from 'luxon'

import { useNavigate } from 'react-router-dom';
import { useStudents } from '../hooks/queries';
import Filter from './Filter';
import moment from 'moment';



const initialValues = {
  academic_session_id: moment(new Date()).format('YYYY'),
  academic_class_id: 10399,
  campus_id: 1,
  name: '',
  is_active: false
}
const initialFilterValues = {
  campus_id: initialValues.campus_id,
  academic_class_id: initialValues.academic_class_id,
  academic_session_id: initialValues.academic_session_id,
  filter_option: 'active'
}

const DataTable = () => {
  const fetchedData = useStudents(initialFilterValues)
  const navigate = useNavigate()
  const createRoute = `/students/create`

  const mData = fetchedData.data?.data ?? [];

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
      cell: ({ row }) => {
        const thisRow = row.original.student_sessions
          .find(x => x.academic_session_id == initialFilterValues.academic_session_id)
        return (
          <>
          <div className='text-blue-200 font-bold text-md'>{row.original.name}</div>
          { thisRow &&
          <div className='flex flex-row gap-2  text-[8px]'>
            <span>
              <span className='text-blue-400 font-bold'>{thisRow.academic_class.name}</span>
            </span>
            <span>
              Section:
              <span className='text-red-400 font-bold'>{thisRow.section.name}</span>
            </span>
            <span>
              Roll:
              <span className='text-green-400 font-bold'>{thisRow.roll_no}</span>
            </span>

          </div>}
          </>


        )
      }
    },
    {
      header: "Type",
      accessorKey: "user_type",
      size: 300,
      visible: false
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
            {/* <button onClick={() => { navigate(`/students/info/${btoa(row.original.student_sessions.filter(x=>x.academic_session.is_current==1).id)}`) }} */}
            <button onClick={() => { navigate(`/students/info/${row.original.id}`) }}
              className="btn btn-outline btn-primary btn-sm btn-rounded ">
              Info..
            </button>
            <button onClick={() => { navigate(`/students/edit/${row.original.id}`) }}
              className="btn btn-outline btn-primary btn-sm btn-rounded ">
              Edit
            </button>
            {/* <button onClick={() => { deleteUserData(row.original.id) }}
              className="btn btn-outline btn-primary btn-sm btn-rounded  ">
              Delete
            </button> */}
          </div>
        )
      }
    }

  ]

  const deleteUserData = (id) => {
    navigate(`/students/delete/${id}`)
  }
  return (
    <FilterTable data={data} columns={columns}

      createRoute={createRoute}
      filter={
        <Filter fetchedData={fetchedData}
          initialFilterValues={initialFilterValues} />
      }
    />
  )
}

export default DataTable
