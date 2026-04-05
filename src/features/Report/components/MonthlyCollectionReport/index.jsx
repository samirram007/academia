import React from 'react'
import MonthlyDataTable from './MonthlyDataTable/MonthlyDataTable';

const MonthlyCollectionReport = () => {
  return (

    <div className="flex flex-col w-full  justify-stretch max-h-full h-full ">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm rounded-2xl overflow-hidden">
        <MonthlyDataTable />
      </div>

    </div>
  )
}

export default MonthlyCollectionReport;
