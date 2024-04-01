import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'

import BasicTable from '../../../components/tables/BasicTable';
import { useNavigate } from 'react-router-dom';
import Filter from './Filter';
import { useAcademicSessions } from '../hooks/quaries';
import Loader from '../../../components/Loader';
import CreateAcademicSession from './CreateAcademicSession';
import EditAcademicSession from './EditAcademicSession';

import DeleteAcademicSession from './DeleteAcademicSession';

const initialValues = {
  campus_id: 1,
  session: '2024-2025',
  start_date: new Date().toISOString().slice(0, 10),
  end_date: new Date().toISOString().slice(0, 10),
  is_current: false,
}

const AcademicSessionTable = () => {

  const AcademicSessionData = useAcademicSessions(initialValues)


  const navigate = useNavigate()
  //   if(AcademicSessionData.isFetching) return <Loader />
  //   if(AcademicSessionData.isError) return <Loader />


  const createRoute = `/academic_sessions/create`

  const mData = AcademicSessionData.data?.data ?? [];

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
      header: "Session",
      accessorKey: "session",
      size: 300,
      cell: info => (
        <div className="flex justify-start    items-center gap-2">
          <span className="text-gray-500">{info.row.original.session} </span>
          {info.row.original.is_current ?<span className="text-green-600 text-sm">[CURRENT]</span>:''}

        </div>
      )
    },
    {
      header: "Campus",
      accessorKey: "campus.name",
      size: 200,
    },
    {
      header: 'Start Date',
      accessorKey: 'start_date',
      cell: info =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
    {
      header: 'End Date',
      accessorKey: 'end_date',
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
           <EditAcademicSession initialValues={row.original} />
           <DeleteAcademicSession initialValues={row.original} />

          </div>
        )
      }
    }

  ]

  return (
    <BasicTable
      data={data} columns={columns}
      createForm={<CreateAcademicSession modal={true} />}
      createFormTitle="Create Academic Session"
      filter={
        <Filter AcademicSessionData={AcademicSessionData}
          initialValues={initialValues} />
      }
      mobileHeaders={['id', 'session']}
    />
  )
}

export default AcademicSessionTable
