import React from "react";

import { useMemo } from "react";

import FilterTable from "../../../components/tables/FilterTable";

import Edit from "./Edit";
import Delete from "./Delete";
import Create from "./Create";
import { useExaminationResults } from "../hooks/quaries";

const initialValues = {
  campus_id: 1,
  session: "2024-2025",
  start_date: new Date().toISOString().slice(0, 10),
  end_date: new Date().toISOString().slice(0, 10),
  is_current: false,
};

const DataTable = () => {
  const fetchedData = useExaminationResults(initialValues);

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
      header: "Scheduled Date & time",
      accessorKey: "examination_scheduled.id",
      cell: (props) => (
        <>
          {props.row.original.examination_scheduled.examination_date +
            " - " +
            props.row.original.examination_scheduled.examination_time}
        </>
      ),
    },
    {
      header: "Mark",
      accessorKey: "marks",
    },
    {
      header: "Student",
      accessorKey: "student.name",
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
      createFormTitle="Create Examination Result"
    />
  );
};

export default DataTable;
