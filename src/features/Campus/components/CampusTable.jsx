import React from 'react'

import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';
import { DateTime } from 'luxon'
import BasicTable from '../../../components/tables/BasicTable';
import { useCampuses } from '../hooks/queries';
const CampusTable = () => {
    const CampusData = useCampuses()


      const createRoute=`/campuses/create`
      const mData = CampusData.data?.data ?? [];

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
          header: "School",
          accessorKey: "school.name",
          size:200,
        },
        {
          header: "Board",
          accessorKey: "education_board.name",
          size:200,
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
                        <button onClick={()=>{ editCampusData(row.original.id)}}
                        className="btn btn-blue btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteCampusData(row.original.id)}}
                        className="btn btn-red btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editCampusData=(id)=>{
        alert(id)
      }
      const deleteCampusData=(id)=>{
        alert(id)
      }
  return (
    <BasicTable data={data} columns={columns} createRoute={createRoute} />
  )
}

export default CampusTable
