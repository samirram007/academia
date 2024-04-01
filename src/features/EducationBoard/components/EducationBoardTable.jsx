import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'

import BasicTable from '../../../components/tables/BasicTable';
import {   Link } from 'react-router-dom';

import { useEducationBoards } from '../hooks/quaries';


import DeleteEducationBoard from './DeleteEducationBoard';

const initialValues = {
  name: '',
  establishment_data: new Date().toISOString().slice(0, 10),
}

const EducationBoardTable = () => {

  const EducationBoardData = useEducationBoards(initialValues)

  const createRoute = `/education_boards/create`

  const mData = EducationBoardData.data?.data ?? [];

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
      header: 'Establishment Date',
      accessorKey: 'establishment_date',
      cell: info =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {

        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
           <Link to={`/education_boards/edit/${row.original.id}`} className='btn btn-outline btn-primary btn-sm btn-rounded ' >Edit</Link>
           <DeleteEducationBoard initialValues={row.original} />

          </div>
        )
      }
    }

  ]

  return (
    <BasicTable
      data={data} columns={columns}
      createRoute={createRoute}
    />
  )
}

export default EducationBoardTable
