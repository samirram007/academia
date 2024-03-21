import { lazy } from 'react';

const Rooms =  lazy(() => import('./Rooms'));
const CreateRoom =  lazy(() => import('./CreateRoom'));
const EditRoom =  lazy(() => import('./EditRoom'));

export {Rooms,CreateRoom, EditRoom};


