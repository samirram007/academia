import React from 'react'
import BasicTable from '../../tables/BasicTable'
import { useQuery } from '@tanstack/react-query';
import { fetchFees  } from '../../../services';
import { useMemo } from 'react';
import { DateTime } from 'luxon'
const FeeTable = () => {
    const FeeData = useQuery({
        queryKey: ['fees'],
        queryFn: fetchFees,
        staleTime:Infinity
      })

      const createRoute=`/fees/create`
      const mData = FeeData.data?.data ?? [];

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
                        <button onClick={()=>{ editFeeData(row.original.id)}}
                        className="btn btn-blue btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteFeeData(row.original.id)}}
                        className="btn btn-red btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editFeeData=(id)=>{
        alert(id)
      }
      const deleteFeeData=(id)=>{
        alert(id)
      }
  return (
    <BasicTable data={data} columns={columns} createRoute={createRoute} />
  )
}

export default FeeTable
