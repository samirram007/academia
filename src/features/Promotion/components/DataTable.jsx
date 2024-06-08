import React from 'react'


import { useMemo } from 'react';



import { usePromotions } from '../hooks/quaries';
import Create from './Create';
import Edit from './Edit';

import Delete from './Delete';
import Filter from './Filter';
import PromotionTable from './PromotionTable';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormikEnrollmentFormModal from '../../../components/form-components/FormikEnrollmentFormModal';
import Enrollment from '../../Student/components/profile/Enrollment';

const initialValues = {
  name: '',
  code: '',
  campus_id: 1,
  academic_session_id: 1,
  academic_class_id: 1,
  section_id: 1

}
const initialFilterValues = {
  campus_id: initialValues.campus_id,
  academic_session_id: initialValues.academic_session_id,
  academic_class_id: initialValues.academic_class_id,
  section_id: initialValues.section_id,
}

const DataTable = () => {

  const PromotionData = usePromotions(initialFilterValues)
  const navigate=useNavigate()
  const mData = PromotionData.data?.data ?? [];

    const data = useMemo(() => {

    return mData.map(item => ({
      ...item,

      selectedStudentSession: item.student_sessions.find(x => x.academic_session_id == initialFilterValues.academic_session_id)
    }))
  }, [mData]);
  // const data = useMemo(() => [...mData], [mData]);



  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      visible: false,
      size: 50,

    },
    {
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
        />
      ),
      accessorKey: 'is_promoted',
      enableSorting: false,
      cell: ({ row }) => {
        return (

          row.original.selectedStudentSession.is_promoted
            ?
            <Checkbox checked={true} disabled={true} color="default"/>
            :
            <Checkbox
              color="success"
              checked={row.getIsSelected()}
              disabled={row.original.selectedStudentSession.is_promoted ? row.getCanSelect() : !row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
            />

        )

      },

    },
    // {
    //   header: 'Promotion',
    //   accessorKey: 'is_promoted',
    //   cell: ({ row }) => row.original.selectedStudentSession.is_promoted ? 'Promoted' : 'waiting'
    // },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Campus',
      accessorKey: 'admission.campus.name',
    },
    {
      header: 'Session',
      accessorKey: 'selectedStudentSession.academic_session.session',
    },
    {
      header: 'Class',
      accessorKey: 'selectedStudentSession.academic_class.name',
    },
    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {

        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
            <button onClick={() => { navigate(`/students/info/${row.original.id}`) }}
              className="btn btn-outline btn-primary btn-sm btn-rounded ">
              Info..
            </button>
            {/* <Edit initialValues={row.original} />
            <Delete initialValues={row.original} /> */}

          </div>
        )
      }
    }

  ]
  //if(PromotionData.isError) return <div>Error...</div>
  //PromotionData
  return (
    <PromotionTable
      data={data} columns={columns}
      createForm={<Create modal={true} />}
      createFormTitle="Create Promotion"
      initialFilterValues={initialFilterValues}
      PromotionData={PromotionData}

    />
  )
}

export default DataTable
