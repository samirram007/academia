import React from 'react'
import MonthlyDataTable from './MonthlyDataTable/MonthlyDataTable';

const MonthlyCollectionReport = () => {
  return (

    <div className="flex flex-col w-full  justify-stretch max-h-full h-full ">
      <div className="card animated fadeInDown bg-zinc-600/20 max-h-full  h-full ">
        <MonthlyDataTable />
      </div>

    </div>
  )
}

export default MonthlyCollectionReport;
