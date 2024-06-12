import { lazy } from 'react';

const TransportFees =  lazy(() => import('./components/DataList'));
const CreateTransportFee =  lazy(() => import('./components/Create'));
const EditTransportFee =  lazy(() => import('./components/Edit'));

export {TransportFees,CreateTransportFee, EditTransportFee};


