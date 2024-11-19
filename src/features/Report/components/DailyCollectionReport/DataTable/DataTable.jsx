import React from 'react'


import { useMemo } from 'react';




import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDailyCollectionReport } from '../../../hooks/queries';
import DailyCollectionReportTable from '../DailyCollectionReportTable/DailyCollectionReportTable';
import { useFeeHeadAll, useFeeHeads } from '../../../../FeeHead/hooks/queries';

const initialValues = {
  //  from: moment(new Date(new Date().getFullYear(),0,1)).format('YYYY-MM-DD'),
  from: moment(new Date()).format('YYYY-MM-DD'),
  to: moment(new Date()).format('YYYY-MM-DD')
}
const initialFilterValues = {
  from: initialValues.from,
  to: initialValues.to,
}



const DataTable = () => {

  const fetchedData = useDailyCollectionReport(initialFilterValues);

  // const feeHeads=useFeeHeadAll();
  const mData = fetchedData.data?.data ?? [];

  const preparedData = useMemo(() => [...mData], [mData]);

  const feeHeads = preparedData.reduce((acc, fee) => {
    fee.fee_items.forEach(item => {
      if (!acc.includes(item.fee_head_name)) {
        acc.push(item.fee_head_name);
      }
    });
    return acc;
  }, []);
  const data = preparedData.map(fee => {
    const feeItems = fee.fee_items.reduce((acc, item) => {
      acc[item.fee_head_name] = item.total_amount;
      return acc;
    }, {});
    return {
      ...fee,
      ...feeItems
    };
  });
  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const staticColumns = [
    {
      header: "ID",
      accessorKey: "id",
      visible: false,
      size: 50,
      className: 'hidden',
    },
    {
      header: 'Fee Receipt',
      accessorKey: 'fee_no',
      className: 'hidden',
    },
    {
      header: 'Date',
      accessorKey: 'fee_date',
      className: 'hidden',
      cell: info => moment(info.getValue()).format('DD-MM-YYYY'),
    },
    {
      header: 'Class',
      accessorKey: 'class',
      className: 'hidden',
      visible: false,
    },
    {
      header: 'Section',
      accessorKey: 'section',
      className: 'hidden',
      visible: false,
    },
    {
      header: 'Roll',
      accessorKey: 'roll_no',
      className: 'hidden',
      visible: false,
    },
    {
      header: 'Name',
      accessorKey: 'name',
      className: 'pinned-left sticky left-0 bg-slate-800 border-r-2 border-b-[1px] border-violet-500   ',
      cell: info => {
        const student = info.row.original
        return <div className='w-[300px] max-w-[300px]'>
          <div className='text-blue-200 font-bold text-md cursor-pointer btn-link'  >{student.name}</div>
          {student &&
            <div className='flex flex-row gap-2  text-[8px]'>
              <span>
                <span className='text-blue-400 font-bold'>{student.class}</span>
              </span>
              <span>
                Section:
                <span className='text-red-400 font-bold'>{student.section}</span>
              </span>
              <span>
                Roll:
                <span className='text-green-400 font-bold'>{student.roll_no}</span>
              </span>

            </div>

          }
          <div className='flex flex-row gap-10  text-[8px]'>
            <div>Fee No. {student.fee_no}</div>
            <div>Fee Date. {moment(student.fee_date).format('DD-MM-YYYY')}</div>
          </div>
        </div>

      },

      footer: ({ table }) => {
        const count = table.getFilteredRowModel().rows.length;
        return <div className='w-[300px] max-w-[300px]' >
          <div>{count} Fee Receipt</div>
        </div>
      },

    },


  ]


  const dynamicColumns = feeHeads.map(feeHead => ({
    header: feeHead,
    accessorKey: feeHead,
    className: '!w-[150px] !max-w-[150px] !min-w-[150px] text-right ',
    cell: info => <div className='text-right'>{info.getValue() || 0}</div>,
    footer: ({ table }) => {
      const total = table.getFilteredRowModel().rows.reduce((sum, row) => (parseFloat(row.original[feeHead]) || 0) + parseFloat(sum), 0);
      return <div className='text-right  font-bold'>{total.toFixed(2)}</div>;
    }
  }));

  const totalColumn = {
    header: 'Total Collection',
    accessorKey: 'total',
    cell: info => <div className='text-right font-bold'>{info.getValue().toFixed(2) || 0}</div>,
    footer: ({ table }) => {
      const total = table.getFilteredRowModel().rows.reduce((sum, row) => parseFloat(row.original.total) + parseFloat(sum), 0);
      return <div className='text-right font-bold'>{total.toFixed(2)}</div>;
    },
    className: 'pinned-right sticky right-0 bg-slate-900 border-r-2 border-b-[1px] border-violet-500 text-right !w-[150px] !max-w-[150px] !min-w-[150px]   ',
  };

  const columns = [...staticColumns, ...dynamicColumns, totalColumn];



  return (
    <DailyCollectionReportTable
      data={data} columns={columns}
      initialFilterValues={initialFilterValues}
      fetchedData={fetchedData}
    />
  )
}

export default DataTable
