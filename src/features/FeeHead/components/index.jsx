import { lazy } from 'react';

const FeeHeads =  lazy(() => import('./DataList'));
const CreateFeeHead =  lazy(() => import('./Create'));
const EditFeeHead =  lazy(() => import('./Edit'));

export {FeeHeads,CreateFeeHead, EditFeeHead};


