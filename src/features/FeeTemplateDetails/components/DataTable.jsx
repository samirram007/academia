import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'
import BasicTable from '../../../components/tables/BasicTable';
import Filter from '../../FeeTemplate/components/Filter';

import { useNavigate } from 'react-router-dom';

import { useFeeTemplates } from '../../FeeTemplate/hooks/quaries';
import CreateFeeTemplate from '../../FeeTemplate/components/Create';
import Edit from '../../FeeTemplate/components/Edit';
import Delete from '../../FeeTemplate/components/Delete';
import FeeTemplateDetails from './FeeTemplateDetails';
import { useFeeTemplateDetails } from '../hooks/quaries';
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

  const FeeTemplateDetailsData = useFeeTemplateDetails({ fee_template_id })


  const mData = FeeTemplateDetailsData.data?.data ?? [];
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
<<<<<<< HEAD
          <div className={`flex justify-start md:justify-center  items-center gap-2  ${info.getValue() ? 'text-green-400' : ''}`}>
=======
          <div className='flex justify-start md:justify-center  items-center gap-2'>
>>>>>>> 38fe76ea24ea4a688945fbee42d4c859bab31c8f
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
<<<<<<< HEAD
          <div className={`flex justify-start md:justify-center  items-center gap-2  ${info.getValue() ? 'text-green-400' : ''}`}>
=======
          <div className='flex justify-start md:justify-center  items-center gap-2'>
>>>>>>> 38fe76ea24ea4a688945fbee42d4c859bab31c8f
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
<<<<<<< HEAD
          <div className={`flex justify-start md:justify-center  items-center gap-2  ${info.getValue() ? 'text-green-400' : ''}`}>
=======
          <div className='flex justify-start md:justify-center  items-center gap-2'>
>>>>>>> 38fe76ea24ea4a688945fbee42d4c859bab31c8f
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
{FeeTemplateDetailsData.isLoading?<Loader/>:
      <ModalTable
        data={data}
        columns={columns}
      />
  }
    </>
  )
}

export default DataTable
