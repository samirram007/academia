import { lazy } from 'react';

const FeeHeads =  lazy(() => import('./FeeHeads'));
const CreateFeeHead =  lazy(() => import('./Create'));
const EditFeeHead =  lazy(() => import('./Edit'));

export {FeeHeads,CreateFeeHead, EditFeeHead};


