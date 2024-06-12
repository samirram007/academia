import { lazy } from 'react';

const TransportExpenses =  lazy(() => import('./DataList'));
const CreateTransportExpense =  lazy(() => import('./Create'));
const EditTransportExpense =  lazy(() => import('./Edit'));
const TransportExpenseFilter =  lazy(() => import('./Filter'));

export {TransportExpenses,CreateTransportExpense, EditTransportExpense,TransportExpenseFilter};


