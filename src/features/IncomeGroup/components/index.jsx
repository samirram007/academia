import { lazy } from 'react';

const IncomeGroups =  lazy(() => import('./DataList'));
const CreateIncomeGroup =  lazy(() => import('./Create'));
const EditIncomeGroup =  lazy(() => import('./Edit'));

export {IncomeGroups,CreateIncomeGroup, EditIncomeGroup};


