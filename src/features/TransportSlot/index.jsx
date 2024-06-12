import { lazy } from 'react';

const TransportSlots =  lazy(() => import('./components/DataList'));
const CreateTransportSlot =  lazy(() => import('./components/Create'));
const EditTransportSlot =  lazy(() => import('./components/Edit'));

export {TransportSlots,CreateTransportSlot, EditTransportSlot};


