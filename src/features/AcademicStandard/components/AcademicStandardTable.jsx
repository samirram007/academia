import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'

import BasicTable from '../../../components/tables/BasicTable';
import { useAcademicStandards } from '../hooks/quaries';


const AcademicStandardTable = () => {
    const AcademicStandardData = useAcademicStandards();


      const createRoute=`/academic_years/create`

      const mData = AcademicStandardData.data?.data ?? [];

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
          header: "Name",
          accessorKey: "name",
          size:300,
        },
        {
          header: "Code",
          accessorKey: "code",
          size:200,
        },
        {
          header: "Description",
          accessorKey: "description",
          size:200,
        },
        {
            header: 'Action',
            accessorKey: 'action',
            align: 'center',
            cell: ({row})=>{
                return (
                    <div className="flex justify-start md:justify-center  items-center">
                        <button onClick={()=>{ editAcademicStandardData(row.original.id)}}
                        className="btn btn-outline btn-primary btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteAcademicStandardData(row.original.id)}}
                        className="btn btn-outline btn-primary btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editAcademicStandardData=(id)=>{
        alert(id)
      }
      const deleteAcademicStandardData=(id)=>{
        alert(id)
      }
  return (
    <BasicTable
    data={data} columns={columns} createRoute={createRoute}
    mobileHeaders={['id','year']}
    />
  )
}

export default AcademicStandardTable
