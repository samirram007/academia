import React from 'react'

import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';
import { DateTime } from 'luxon'
import BasicTable from '../../../components/tables/BasicTable';
import { useSchools } from '../hooks/queries';
import CreateSchool from './CreateSchool';
import EditSchool from './EditSchool';
const SchoolTable = () => {
    const SchoolData = useSchools()


      const createRoute=`/schools/create`
      const mData = SchoolData.data?.data ?? [];

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
                <div className="flex justify-start md:justify-center  items-center gap-2">
                 <EditSchool initialValues={row.original} />
                 <DeleteSchool initialValues={row.original} />

                </div>
              )
            }
        }

      ]

  return (
    <BasicTable data={data} columns={columns}
    createForm={<CreateSchool modal={true} />}
    createFormTitle="Create School"
     />
  )
}

export default SchoolTable
