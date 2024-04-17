import React from 'react'

import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';
import { DateTime } from 'luxon'
import { fetchFees } from '../../../services';
import BasicTable from '../../../components/tables/BasicTable';
const FeeReceiptTable = () => {
    const FeeReceiptData = useQuery({
        queryKey: ['fee_receipts'],
        queryFn: fetchFees,
        staleTime:Infinity
      })

      const createRoute=`/fee_receipts/create`
      const mData = FeeReceiptData.data?.data ?? [];

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
                        <button onClick={()=>{ editFeeReceiptData(row.original.id)}}
                        className="btn btn-blue btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteFeeReceiptData(row.original.id)}}
                        className="btn btn-red btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editFeeReceiptData=(id)=>{
        alert(id)
      }
      const deleteFeeReceiptData=(id)=>{
        alert(id)
      }
  return (
    <BasicTable data={data} columns={columns} createRoute={createRoute} />
  )
}

export default FeeReceiptTable
