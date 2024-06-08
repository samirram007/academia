import { lazy } from 'react';

const Promotions =  lazy(() => import('./components/DataList'));
const CreatePromotion =  lazy(() => import('./components/Create'));
const EditPromotion =  lazy(() => import('./components/Edit'));

export {Promotions,CreatePromotion, EditPromotion};


