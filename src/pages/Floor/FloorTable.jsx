import React from 'react'
import BasicTable from '../../tables/BasicTable'
import { useQuery } from '@tanstack/react-query';
import { fetchFloors  } from '../../../services';
import { useMemo } from 'react';
import { DateTime } from 'luxon'
const FloorTable = () => {
    const FloorData = useQuery({
        queryKey: ['floors'],
        queryFn: fetchFloors,
        staleTime:Infinity
      })

      const createRoute=`/floors/create`
      const mData = FloorData.data?.data ?? [];

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
                        <button onClick={()=>{ editFloorData(row.original.id)}}
                        className="btn btn-blue btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteFloorData(row.original.id)}}
                        className="btn btn-red btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editFloorData=(id)=>{
        alert(id)
      }
      const deleteFloorData=(id)=>{
        alert(id)
      }
  return (
    <BasicTable data={data} columns={columns} createRoute={createRoute} />
  )
}

export default FloorTable
