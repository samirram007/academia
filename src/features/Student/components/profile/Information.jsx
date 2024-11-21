import { lazy, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
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
   if(isLoading){
      return <div>Loading...</div>
   }
   if(isError){
      return <div>Error...</div>
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
    <div className='container-flex md-container max-h-full w-full '>
    <div className='row  flex flex-col md:flex-row justify-between gap-2 border-b-2 border-blue-300/10 pb-2 mb-2 '>
        <div className='flex flex-col gap-2 flex-1 text-3xl'>
          <Breadcrumbs />
        </div>
        <div className='flex flex-row gap-2 flex-1'>

        </div>
        <div className='flex flex-row gap-2 justify-center flex-1 items-center'>

        </div>
    </div>

      {/* <TestAcademicSessionsCall data={initialValues}  /> */}
      <AcademicSessionsCall data={initialValues} />
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
  if (fetchedData.isFetching) return <div>Loading..</div>
  return(
    <ProfileHeader data={data} fetchedAcademicSessions={fetchedAcademicSessions}/>
  )
}
export default Information
