import { lazy } from 'react';

const TransportUsers =  lazy(() => import('./components/DataList'));
const CreateTransportUser =  lazy(() => import('./components/Create'));
const EditTransportUser =  lazy(() => import('./components/Edit'));

export {TransportUsers,CreateTransportUser, EditTransportUser};


