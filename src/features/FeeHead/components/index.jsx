import { lazy } from 'react';

const FeeHeads =  lazy(() => import('./FeeHeads'));
const CreateFeeHead =  lazy(() => import('./CreateFeeHead'));
const EditFeeHead =  lazy(() => import('./EditFeeHead'));

export {FeeHeads,CreateFeeHead, EditFeeHead};


