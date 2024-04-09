import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'
import BasicTable from '../../../components/tables/BasicTable';
import Filter from './Filter';

import { useNavigate } from 'react-router-dom';

import { useFeeTemplates } from '../hooks/quaries';
import CreateFeeTemplate from './Create';


const initialValues = {
  academic_session_id: 1,
  academic_class_id: 1,
  campus_id: 1
}
const initialFilterValues = {
  campus_id: initialValues.campus_id,
  academic_class_id:initialValues.academic_class_id,
  academic_session_id:initialValues.academic_session_id,
}
const DataTable = () => {

  const FeeTemplateData = useFeeTemplates(initialFilterValues)
  const navigate = useNavigate()

  const mData = FeeTemplateData.data?.data ?? [];
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
      header: "Name",
      accessorKey: "name",
      size: 300,
    },
    {
      header: "Campus",
      accessorKey: "academic_session.campus.name",
      size: 200,
    },

    {
      header: "Academic Session",
      accessorKey: "academic_session.session",
      size: 200,
    },
    {
      header: "Academic Classes",
      accessorKey: "academic_class.name",
      size: 200,
    },

    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {
        return (
          <div className="flex justify-start md:justify-center  items-center">
            <button onClick={() => { editFeeTemplateData(row.original.id) }}
              className="btn btn-outline btn-primary btn-sm btn-rounded">
              Edit
            </button>
            <button onClick={() => { deleteFeeTemplateData(row.original.id) }}
              className="btn btn-outline btn-primary btn-sm btn-rounded ml-2">
              Delete
            </button>
          </div>
        )
      }
    }

  ]
  const editFeeTemplateData = (id) => {
    navigate(`/fee_templates/edit/${id}`)
  }
  const deleteFeeTemplateData = (id) => {
    navigate(`/fee_templates/delete/${id}`)
  }
  return (
    <BasicTable
    data={data}
    columns={columns}
    createForm={<CreateFeeTemplate modal={true}/>}
    filter={
        <Filter FeeTemplateData={FeeTemplateData}
        initialFilterValues={initialFilterValues} />
      }
    />
  )
}

export default DataTable
