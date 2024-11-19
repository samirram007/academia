import { lazy } from 'react';

const DailyCollectionReport =  lazy(() => import('./components/DailyCollectionReport/DailyCollectionReport'));
const MonthlyCollectionReport = lazy(()=> import('./components/MonthlyCollectionReport'));

export {DailyCollectionReport,MonthlyCollectionReport};


