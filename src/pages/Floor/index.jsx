import { lazy } from 'react';

const Floors =  lazy(() => import('./Floors'));
const CreateFloor =  lazy(() => import('./CreateFloor'));
const EditFloor =  lazy(() => import('./EditFloor'));

export {Floors,CreateFloor, EditFloor};


