import { lazy } from 'react';

const TransportTypes =  lazy(() => import('./components/DataList'));
const CreateTransportType =  lazy(() => import('./components/Create'));
const EditTransportType =  lazy(() => import('./components/Edit'));

export {TransportTypes,CreateTransportType, EditTransportType};


