import React from "react";

import { useMemo } from "react";

import FilterTable from "../../../components/tables/FilterTable";

import { useExaminations } from "../hooks/quaries";

import Edit from "./Edit";
import Delete from "./Delete";
import Create from "./Create";

const initialValues = {
  name: "Yearly",
  examination_types_id: 0,
  examination_start_date: "2024-11-23 09:31:15",
  examination_end_date: "2024-06-25 14:31:15",
  academic_session_id: 2024,
  campus_id: 0,
};

const DataTable = () => {
  const fetchedData = useExaminations(initialValues);

  const mData = fetchedData.data?.data ?? [];

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
    },
    {
      header: "Examination Type",
      accessorKey: "examination_type.name",
    },
    {
      header: "Examination Start-End",
      accessorKey: "examination_start_date",
      cell: (props) => (
        <>
          {props.row.original.examination_start_date +
            " - " +
            props.row.original.examination_end_date}
        </>
      ),
    },
    {
      header: "Session",
      accessorKey: "academic_session.session",
    },
    {
      header: "Campus Name",
      accessorKey: "campus.name",
    },
    {
      header: "Action",
      accessorKey: "action",
      align: "center",
      cell: ({ row }) => {
        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
            <Edit initialValues={row.original} />
            <Delete initialValues={row.original} />
          </div>
        );
      },
    },
  ];

  return (
    <FilterTable
      data={data}
      columns={columns}
      createForm={<Create modal={true} />}
      createFormTitle="Create Examination"
    />
  );
};

export default DataTable;
