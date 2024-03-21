import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'

import BasicTable from '../../../components/tables/BasicTable';
import { useAcademicClasses } from '../hooks/queries';
const AcademicClassTable = () => {
    const AcademicClassData = useAcademicClasses();

      const createRoute=`/academic_years/create`

      const mData = AcademicClassData.data?.data ?? [];

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
          header: "Year",
          accessorKey: "year",
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
                        <button onClick={()=>{ editAcademicClassData(row.original.id)}}
                        className="btn btn-outline btn-primary btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteAcademicClassData(row.original.id)}}
                        className="btn btn-outline btn-primary btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editAcademicClassData=(id)=>{
        alert(id)
      }
      const deleteAcademicClassData=(id)=>{
        alert(id)
      }
  return (
    <BasicTable
    data={data} columns={columns} createRoute={createRoute}
    mobileHeaders={['id','year']}
    />
  )
}

export default AcademicClassTable
