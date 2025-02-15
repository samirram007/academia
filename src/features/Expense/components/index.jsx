import { lazy } from 'react';

const Expenses =  lazy(() => import('./DataList'));
const CreateExpense =  lazy(() => import('./Create'));
const EditExpense =  lazy(() => import('./Edit'));
const ExpenseFilter =  lazy(() => import('./Filter'));

export { CreateExpense, EditExpense, ExpenseFilter, Expenses };


