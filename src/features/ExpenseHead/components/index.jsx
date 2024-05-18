import { lazy } from 'react';

const ExpenseHeads =  lazy(() => import('./DataList'));
const CreateExpenseHead =  lazy(() => import('./Create'));
const EditExpenseHead =  lazy(() => import('./Edit'));

export {ExpenseHeads,CreateExpenseHead, EditExpenseHead};


