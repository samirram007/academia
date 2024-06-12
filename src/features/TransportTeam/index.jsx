import { lazy } from 'react';

const TransportTeams =  lazy(() => import('./components/DataList'));
const CreateTransportTeam =  lazy(() => import('./components/Create'));
const EditTransportTeam =  lazy(() => import('./components/Edit'));

export {TransportTeams,CreateTransportTeam, EditTransportTeam};


