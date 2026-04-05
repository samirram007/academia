import { lazy } from 'react';

const DailyCollectionReport =  lazy(() => import('./components/DailyCollectionReport/DailyCollectionReport'));
const MonthlyCollectionReport = lazy(() => import('./components/MonthlyCollectionReport'));
const ExamFeesCollectionReport = lazy(() => import('./components/ExamFeesCollectionReport'));


export { DailyCollectionReport, MonthlyCollectionReport, ExamFeesCollectionReport };


