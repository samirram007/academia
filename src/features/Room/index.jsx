import { lazy } from 'react';

const Rooms =  lazy(() => import('./components/DataList'));
const CreateRoom =  lazy(() => import('./components/Create'));
const EditRoom =  lazy(() => import('./components/Edit'));

export {Rooms,CreateRoom, EditRoom};


