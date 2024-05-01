import React from 'react'

import { useMemo } from 'react';
import { DateTime } from 'luxon'
import BasicTable from '../../../components/tables/BasicTable';

import { useNavigate } from 'react-router-dom';
import { useFeeHeads } from '../hooks/queries';
import CreateFeeHead from './Create';
import Delete from './Delete';
import Edit from './Edit';
const DataTable = () => {
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
                  <div className="flex justify-start md:justify-center  items-center gap-2">
                  <Edit initialValues={row.original} />
                  <Delete initialValues={row.original} />

                 </div>
                )
            }
        }

      ]

  return (
    <BasicTable data={data} columns={columns}
    // createRoute={createRoute}
     createForm={<CreateFeeHead modal={true} />}
     />
  )
}

export default DataTable