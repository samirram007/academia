import { lazy } from 'react';

const Fees =  lazy(() => import('./DataList'));
const CreateFee =  lazy(() => import('./Create'));
const EditFee =  lazy(() => import('./Edit'));
const FeeFilter =  lazy(() => import('./Filter'));

export {Fees,CreateFee, EditFee,FeeFilter};


