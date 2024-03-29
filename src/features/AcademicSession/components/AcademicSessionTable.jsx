import React, { memo } from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'

import BasicTable from '../../../components/tables/BasicTable';
import { useNavigate } from 'react-router-dom';
import Filter from './Filter';
import { useAcademicSessions } from '../hooks/quaries';
import Loader from '../../../components/Loader';

const initialValues = {
  campus_id: 1
}
const AcademicSessionTable = () => {

  const AcademicSessionData =  useAcademicSessions(initialValues)


  const navigate = useNavigate()
//   if(AcademicSessionData.isFetching) return <Loader />
//   if(AcademicSessionData.isError) return <Loader />

      const createRoute=`/academic_sessions/create`

      const mData = AcademicSessionData.data?.data ?? [];

      const data = useMemo(() => [...mData], [mData]);

      /** @type {import('@tanstack/react-table').ColumnDef<any>} */
      const columns = [
        {
          header: "ID",
          accessorKey: "id",
          visible: false,
          size:50,

        },
        {
          header: "Session",
          accessorKey: "session",
          size:300,
        },
        {
          header: "Campus",
          accessorKey: "campus.name",
          size:200,
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
            cell: ({row})=>{
                return (
                    <div className="flex justify-start md:justify-center  items-center">
                        <button onClick={()=>{ editAcademicSessionData(row.original.id)}}
                        className="btn btn-outline btn-primary btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteAcademicSessionData(row.original.id)}}
                        className="btn btn-outline btn-primary btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editAcademicSessionData=(id)=>{
        alert(id)
      }
      const deleteAcademicSessionData=(id)=>{
        alert(id)
      }
  return (
    <BasicTable
    data={data} columns={columns} createRoute={createRoute}

    filter={
      <Filter AcademicSessionData={AcademicSessionData}
        initialValues={initialValues} />
    }
    mobileHeaders={['id','session']}
    />
  )
}

export default AcademicSessionTable
