import { lazy } from 'react';

const Floors =  lazy(() => import('./components/DataList'));
const CreateFloor =  lazy(() => import('./components/Create'));
const EditFloor =  lazy(() => import('./components/Edit'));

export {Floors,CreateFloor, EditFloor};


