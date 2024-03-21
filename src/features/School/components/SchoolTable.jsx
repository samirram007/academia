import React from 'react'

import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';
import { DateTime } from 'luxon'
import BasicTable from '../../../components/tables/BasicTable';
import { useSchools } from '../hooks/queries';
const SchoolTable = () => {
    const SchoolData = useSchools()


      const createRoute=`/schools/create`
      const mData = SchoolData.data?.data ?? [];

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
          header: "Contact No",
          accessorKey: "contact_no",
          size:200,
        },
        {
          header: "Email",
          accessorKey: "email",
          size:200,
        },

        {
            header: 'Action',
            accessorKey: 'action',
            align: 'center',
            cell: ({row})=>{
                return (
                    <div className="flex justify-start md:justify-center  items-center">
                        <button onClick={()=>{ editSchoolData(row.original.id)}}
                        className="btn btn-blue btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteSchoolData(row.original.id)}}
                        className="btn btn-red btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editSchoolData=(id)=>{
        alert(id)
      }
      const deleteSchoolData=(id)=>{
        alert(id)
      }
  return (
    <BasicTable data={data} columns={columns} createRoute={createRoute} />
  )
}

export default SchoolTable
