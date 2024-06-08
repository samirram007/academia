import React from 'react'


import { useMemo } from 'react';



import { useStudentIdCards } from '../hooks/quaries';
import Create from './Create';
import Edit from './Edit';

import Delete from './Delete';
import Filter from './Filter';
import StudentIdCardTable from './StudentIdCardTable';
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

  const StudentIdCardData = useStudentIdCards(initialFilterValues)
  const navigate=useNavigate()
  const mData = StudentIdCardData.data?.data ?? [];

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
        <>

        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler

          />  {'Select All'}
          </>
      ),
      accessorKey: 'is_promoted',
      enableSorting: false,
      cell: ({ row }) => {
        return (

          row.original.selectedStudentSession.is_promoted
            ?
            <Checkbox checked={true} disabled={true} color="default"
            sx={{
              boxShadow: 1,
              p: 0,
              borderRadius:1,
              minWidth: 1,
            }}/>
            :
            <Checkbox
              color="success"
              checked={row.getIsSelected()}
              disabled={row.original.selectedStudentSession.is_promoted ? row.getCanSelect() : !row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
              sx={{
                boxShadow: 1,
                borderRadius:1,
                p: 0,
                minWidth: 1,
              }}

            />

        )

      },

    },


  ]

  return (
    <StudentIdCardTable
      data={data} columns={columns}
      createForm={<Create modal={true} />}
      createFormTitle="Create StudentIdCard"
      initialFilterValues={initialFilterValues}
      StudentIdCardData={StudentIdCardData}

    />
  )
}

export default DataTable
