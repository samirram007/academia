import { lazy } from 'react';

const FeeReceipts =  lazy(() => import('./FeeReceipts'));
const CreateFeeReceipt =  lazy(() => import('./CreateFeeReceipt'));
const EditFeeReceipt =  lazy(() => import('./EditFeeReceipt'));

export {FeeReceipts,CreateFeeReceipt, EditFeeReceipt};


