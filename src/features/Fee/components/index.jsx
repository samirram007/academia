import { lazy } from 'react';

const Fees =  lazy(() => import('./Fees'));
const CreateFee =  lazy(() => import('./CreateFee'));
const EditFee =  lazy(() => import('./EditFee'));

export {Fees,CreateFee, EditFee};


