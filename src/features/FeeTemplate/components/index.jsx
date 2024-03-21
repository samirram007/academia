import { lazy } from 'react';

const FeeTemplates =  lazy(() => import('./FeeTemplates'));
const CreateFeeTemplate =  lazy(() => import('./CreateFeeTemplate'));
const EditFeeTemplate =  lazy(() => import('./EditFeeTemplate'));
const FeeTemplateFilter =  lazy(() => import('./FeeTemplateFilter'));

export {FeeTemplates,CreateFeeTemplate, EditFeeTemplate,FeeTemplateFilter};


