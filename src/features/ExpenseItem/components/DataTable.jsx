import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'
import FilterTable from '../../../components/tables/FilterTable';
import Filter from '../../FeeTemplate/components/Filter';

import { useNavigate } from 'react-router-dom';

import { useFeeTemplates } from '../../FeeTemplate/hooks/quaries';
import CreateFeeTemplate from '../../FeeTemplate/components/Create';
import Edit from '../../FeeTemplate/components/Edit';
import Delete from '../../FeeTemplate/components/Delete';
import FeeTemplateItem from './ExpenseItem';
import { useFeeTemplateItems } from '../hooks/quaries';
import ModalTable from '../../../components/tables/ModalTable';
import Loader from '../../../components/Loader';



const initialValues = {
  academic_session_id: 1,
  academic_class_id: 1,
  campus_id: 1,
  name: '',
  is_active: false
}

const DataTable = ({ fee_template_id, setEntryId }) => {

  const FeeTemplateItemData = useFeeTemplateItems({ fee_template_id })


  const mData = FeeTemplateItemData.data?.data ?? [];
  const data = useMemo(() => [...mData], [mData]);

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      visible: false,
      size: 50,

    },
    {
      header: "Sl No",
      accessorKey: "sort_index",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Amount",
      accessorKey: "amount",
    },
    {
      header: "Active",
      accessorKey: "is_active",
      align: 'center',
      cell: info => {
        return (
          <div className={`flex justify-start md:justify-center  items-center gap-2  ${info.getValue() ? 'text-green-400' : ''}`}>
            {info.getValue() ? 'Yes' : 'No'}
          </div>
        )
      }
    },
    {
      header: "Customizable",
      accessorKey: "is_customizable",
      align: 'center',
      cell: info => {
        return (
          <div className={`flex justify-start md:justify-center  items-center gap-2  ${info.getValue() ? 'text-green-400' : ''}`}>
            {info.getValue() ? 'Yes' : 'No'}
          </div>
        )
      }
    },
    {
      header: "Periodic Details",
      accessorKey: "keep_periodic_details",
      align: 'center',
      cell: info => {
        return (
          <div className={`flex justify-start md:justify-center  items-center gap-2  ${info.getValue() ? 'text-green-400' : ''}`}>
            {info.getValue() ? 'Yes' : 'No'}
          </div>
        )
      }
    },


    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {
        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
            <button onClick={() => setEntryId(row.original.id)}
              className="btn btn-outline btn-primary btn-sm btn-rounded ">
              Edit
            </button>

            <Delete initialValues={row.original} />

          </div>
        )
      }
    }

  ]

  return (
    <>
{FeeTemplateItemData.isLoading?<Loader/>:
      <ModalTable
        data={data}
        columns={columns}
      />
  }
    </>
  )
}

export default DataTable
