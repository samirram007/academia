import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'
import FilterTable from '../../../components/tables/FilterTable';
import Filter from './Filter';

import { useNavigate } from 'react-router-dom';

import { useFeeTemplates } from '../hooks/quaries';
import CreateFeeTemplate from './Create';
import Edit from './Edit';

import FeeTemplateItem from '../../FeeTemplateItem/components/FeeTemplateItem';
import Clone from './Clone';
import moment from 'moment';


const initialValues = {
  academic_class_id: 10399,
  campus_id: 1,
  name:'',
  is_active:false
}
const initialFilterValues = {
  campus_id: initialValues.campus_id,
  academic_class_id:initialValues.academic_class_id,
  is_active:false
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
      cell: ({row})=>{

        return <>
        <p title={row.original.is_active ?'active':'de-active'}
        className={`text-sm font-semibold
          ${row.original.is_active ? 'text-blue-500':'text-red-500'}
          `}>{row.getValue('name')} </p>
          <div className='text-xs text-violet-400 font-semibold'>Use Count : {row.original.fees_count}</div>
        </>
      }



    },
    {
      header: "Campus",
      accessorKey: "campus.name",

    },

    {
      header: "Class",
      accessorKey: "academic_class.name",

    },

    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {
        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
          <FeeTemplateItem  initialValues={row.original} />
          <Clone  initialValues={row.original} />
          <Edit  initialValues={row.original} />
          {/* <Delete initialValues={row.original} /> */}

         </div>
        )
      }
    }

  ]

  return (
    <FilterTable
    data={data}
    columns={columns}
    createForm={<CreateFeeTemplate modal={true}/>}
    createFormTitle={'New Fee Template'}
    filter={
        <Filter FeeTemplateData={FeeTemplateData}
        initialFilterValues={initialFilterValues} />
      }
    />
  )
}

export default DataTable
