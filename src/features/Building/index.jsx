import { lazy } from 'react';

const Buildings =  lazy(() => import('./components/DataList'));
const CreateBuilding =  lazy(() => import('./components/Create'));
const EditBuilding =  lazy(() => import('./components/Edit'));

export {Buildings,CreateBuilding, EditBuilding};


