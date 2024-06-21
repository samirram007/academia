import { lazy } from 'react';

const ExpenseGroups =  lazy(() => import('./DataList'));
const CreateExpenseGroup =  lazy(() => import('./Create'));
const EditExpenseGroup =  lazy(() => import('./Edit'));

export {ExpenseGroups,CreateExpenseGroup, EditExpenseGroup};
