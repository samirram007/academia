import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'

import { useAcademicSessions } from '../hooks/quaries';
import CreateAcademicSession from './Create';
import EditAcademicSession from './Edit';
import DeleteAcademicSession from './Delete';
import moment from 'moment';
import BasicTable from '../../../components/tables/BasicTable';


// session: '2024', //current Year

const initialValues = {
  session: moment(new Date()).format('YYYY'),
  start_date: moment(new Date()).format('YYYY-MM-DD'),
  end_date: moment(new Date()).format('YYYY-MM-DD'),
  is_current: false,
}

const DataTable = () => {

  const fetchedData = useAcademicSessions({is_current:false})

  const mData = fetchedData.data?.data ?? [];

  const data = useMemo(() => [...mData], [mData]);

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID", accessorKey: "id", visible: false, size: 50,
    },
    {
      header: "Session", accessorKey: "session", size: 300, cell: info => (
        <div className="flex justify-start    items-center gap-2">
          <span className="text-gray-500">{info.row.original.session} </span>
          {info.row.original.is_current ? <span className="text-green-600 text-sm">[CURRENT]</span> : ''}
        </div>
      )
    },
    {
      header: 'Start Date', accessorKey: 'start_date', cell: info =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
    {
      header: 'End Date', accessorKey: 'end_date', cell: info =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
    {
      header: 'Action', accessorKey: 'action', align: 'center',
      cell: ({ row }) => {
        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
            <EditAcademicSession initialValues={row.original} />
            {/* <DeleteAcademicSession initialValues={row.original} /> */}
          </div>
        )
      }
    }

  ]

  return (
    <BasicTable
      data={data} columns={columns}
      createForm={<CreateAcademicSession initialValues={initialValues} modal={true} />}
      createFormTitle="Create Academic Session"
      mobileHeaders={['id', 'session']}
    />
  )
}

export default DataTable
