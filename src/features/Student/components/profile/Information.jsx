import { lazy, Suspense, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useAcademicSessions } from '../../../AcademicSession/hooks/quaries';
import { useStudent } from '../../hooks/queries';

// import ProfileHeader from './ProfileHeader';
 const ProfileHeader=lazy(() => import('./ProfileHeader'));
const Breadcrumbs=lazy(() => import('../../../../components/Breadcrumbs'));


const Information = () => {

  const { id } = useParams();
  const [entryMode,setEntryMode]=useState('info');
  const {data:infoData,isError, isLoading}=useStudent(id)
  const mData = infoData?.data ?? [];
  //console.log({...mData})
    const memoData = useMemo(() => ({...mData}), [mData]);
  if (isLoading) {
    return (
      <div className='rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900'>
        <div className='animate-pulse space-y-3'>
          <div className='h-5 w-40 rounded bg-slate-200 dark:bg-slate-700' />
          <div className='h-28 rounded-lg bg-slate-100 dark:bg-slate-800' />
          <div className='h-72 rounded-lg bg-slate-100 dark:bg-slate-800' />
        </div>
      </div>
    )
   }
   if(isError){
     return <div className='rounded-lg border border-red-300/50 bg-red-50 p-4 text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-200'>Error...</div>
   }

  const initialValues = memoData ?? {
      name: '',
      username: '',
      code: '',
      password: '',
      user_type: 'student',
      email: '',
      contact_no: '',
      status: 'active',
      emergency_contact_name: '',
      emergency_contact_no: '',
      birth_mark: '',
      medical_conditions: '',
      allergies: '',
      language: 'Hindi',
      nationality: 'Indian',
      religion: 'Hindu',
      caste: 'General',
      gender: 'Male',
      dob: '',
      doj: '',
      aadhaar_no: '',
      pan_no: '',
      passport_no: '',
      bank_name: '',
      account_holder_name: '',
      bank_account_no: '',
      bank_ifsc: '',
      bank_branch: '',
      admission_no: '',
      admission_date: '',
      campus_id: 1,
      profile_document_id: 1
  }

  return (
    <div className='container-flex md-container max-h-full w-full'>
      <div className='row flex flex-col md:flex-row justify-between gap-2 border-b border-blue-200/60 dark:border-slate-700 pb-2 mb-3'>
        <div className='flex flex-col gap-2 flex-1 text-3xl'>
          <Suspense fallback={<div className='h-6 w-40 rounded bg-slate-200 dark:bg-slate-700 animate-pulse' />}>
            <Breadcrumbs />
          </Suspense>
        </div>
        <div className='flex flex-row gap-2 flex-1'>

        </div>
        <div className='flex flex-row gap-2 justify-center flex-1 items-center'>

        </div>
    </div>

      {/* <TestAcademicSessionsCall data={initialValues}  /> */}
      <Suspense fallback={<ProfileLoadingShell />}>
        <AcademicSessionsCall data={initialValues} />
      </Suspense>
    {/* <div>Hello</div> */}


</div>
  )
}
export const TestAcademicSessionsCall=({data})=>{
  const  fetchedData  = useAcademicSessions({})
  const mData = fetchedData.data?.data ?? [];
  const fetchedAcademicSessions = useMemo(() => [...mData], [mData]);
  if (fetchedData.isLoading) return <div>Loading..</div>
  return(
    <ProfileHeader data={data} fetchedAcademicSessions={fetchedAcademicSessions}/>

  )

}
// export const TestProfileHeader=({data,fetchedAcademicSessions})=>{
//   return <div>Hello3{JSON.stringify(fetchedAcademicSessions)}</div>
// }
export const AcademicSessionsCall=({data})=>{
  const  fetchedData  = useAcademicSessions({})
  const mData = fetchedData.data?.data ?? [];
  const fetchedAcademicSessions = useMemo(() => [...mData], [mData]);
  if (fetchedData.isLoading) return <ProfileLoadingShell />
  return(
    <ProfileHeader data={data} fetchedAcademicSessions={fetchedAcademicSessions}/>
  )
}

const ProfileLoadingShell = () => {
  return (
    <div className='w-full space-y-3'>
      <div className='rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900'>
        <div className='animate-pulse space-y-3'>
          <div className='h-6 w-56 rounded bg-slate-200 dark:bg-slate-700' />
          <div className='h-10 w-80 rounded-full bg-slate-100 dark:bg-slate-800' />
          <div className='h-8 w-[26rem] rounded-full bg-slate-100 dark:bg-slate-800' />
        </div>
      </div>
      <div className='rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900'>
        <div className='animate-pulse space-y-3'>
          <div className='h-8 w-full rounded bg-slate-100 dark:bg-slate-800' />
          <div className='h-72 w-full rounded bg-slate-100 dark:bg-slate-800' />
        </div>
      </div>
    </div>
  )
}
export default Information
