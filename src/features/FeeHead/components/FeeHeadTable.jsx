import React from 'react'

import { useMemo } from 'react';
import { DateTime } from 'luxon'
import BasicTable from '../../../components/tables/BasicTable';

import { useNavigate } from 'react-router-dom';
import { useFeeHeads } from '../hooks/queries';
import CreateFeeHead from './CreateFeeHead';
const FeeHeadTable = () => {
    const FeeHeadData = useFeeHeads()
      const navigate = useNavigate()

      const createRoute=`/fee_heads/create`

      const mData = FeeHeadData.data?.data ?? [];

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
            header: 'Action',
            accessorKey: 'action',
            align: 'center',
            cell: ({row})=>{
                return (
                    <div className="flex justify-start md:justify-center  items-center">
                        <button onClick={()=>{ editFeeHeadData(row.original.id)}}
                        className="btn btn-outline btn-primary btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteFeeHeadData(row.original.id)}}
                        className="btn btn-outline btn-primary btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editFeeHeadData=(id)=>{
        navigate(`/fee_heads/edit/${id}`)
      }
      const deleteFeeHeadData=(id)=>{
        navigate(`/fee_heads/delete/${id}`)
      }
  return (
    <BasicTable data={data} columns={columns}
    // createRoute={createRoute}
     createForm={<CreateFeeHead modal={true} />}
     />
  )
}

export default FeeHeadTable
