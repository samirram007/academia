import { lazy } from 'react';

const Buildings =  lazy(() => import('./Buildings'));
const CreateBuilding =  lazy(() => import('./CreateBuilding'));
const EditBuilding =  lazy(() => import('./EditBuilding'));

export {Buildings,CreateBuilding, EditBuilding};


