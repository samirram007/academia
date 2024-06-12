import { lazy } from 'react';

const Transports =  lazy(() => import('./components/DataList'));
const CreateTransport =  lazy(() => import('./components/Create'));
const EditTransport =  lazy(() => import('./components/Edit'));

export {Transports,CreateTransport, EditTransport};


