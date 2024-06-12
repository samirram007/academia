import { lazy } from 'react';

const TransportExpenses =  lazy(() => import('./components/DataList'));
const CreateTransportExpense =  lazy(() => import('./components/Create'));
const EditTransportExpense =  lazy(() => import('./components/Edit'));

export {TransportExpenses,CreateTransportExpense, EditTransportExpense};


