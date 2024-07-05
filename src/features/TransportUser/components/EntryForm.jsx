import React, { useEffect, useMemo, useRef, useState } from 'react'


import {
    useDeleteTransportUserMutation,
    useStoreTransportUserMutation,
    useUpdateTransportUserMutation
} from '../hooks/mutations';
import { useFormik } from 'formik';

import { FormikCheckBox, FormikInputBox } from '../../../components/form-components';
import useDebouncedInput from '../../../hooks/useDebouncedInput';
import { useUserSearch } from '../hooks/quaries';
import { TransportSelect } from '../../Common/components/TransportSelect';
import { JourneyTypeSelect } from '../../Common/components/JourneyTypeSelect';
import { FormikInputBoxNDB } from '../../../components/form-components/FormikInputBoxNDB';
import InputForm from './InputForm';
import { Capitalize } from '../../../libs/utils';




const EntryForm = ({ initialValues, entryMode }) => {


    const [isSearching, setSearching] = useState(true)
    const [selectedUser, setSelectedUser] = useState({})
    const [defaultMonthlyCharge, setDefaultMonthlyCharge] = useState({ ...initialValues }.monthly_charge)
    useEffect(() => {
        if (entryMode == 'edit') {
            setSearching(prev => false)
            setSelectedUser(prev => initialValues.user)
        }
    }, [])


    return (
        <div className='relative h-[91vh] w-full'>
            {
                isSearching ?
                    <SearchUser initialValues={initialValues} entryMode={'search'} setSearching={setSearching} setSelectedUser={setSelectedUser} />
                    :
                    selectedUser &&
                    <>
                        <SelectedUserPanel selectedUser={selectedUser} setSearching={setSearching} entryMode={entryMode} />
                        <InputForm initialValues={initialValues} entryMode={entryMode}
                            defaultMonthlyCharge={defaultMonthlyCharge}
                            setDefaultMonthlyCharge={setDefaultMonthlyCharge}
                        />
                    </>
            }
        </div>
    )
}

export default EntryForm
export const SearchUser = ({ initialValues, entryMode, setSearching, setSelectedUser }) => {
    const searchRef = useRef()
    const [searchText, setSearchText] = useState({ searchText: '' })
    const [inputText, setInputText] = useState({ searchText: '' })
    const [debouncedValue, setDebouncedValue] = useState('');
    const fetchedData = useUserSearch({ searchText })
    const mData = fetchedData.data?.data ?? [];

    const userData = useMemo(() => [...mData], [mData]);

    // const debouncedInput = useDebouncedInput(searchRef.current,1000);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputText);
        }, 1000); // Adjust the delay as needed

        return () => {
            clearTimeout(handler);
        };
    }, [inputText]);
    useEffect(() => {
        if (debouncedValue) {
            setSearchText(prev => searchRef.current.value)
            //  console.log('Search:', debouncedValue);
        }
    }, [debouncedValue]);
    const handleChange = () => {
        setInputText(prev => searchRef.current.value)
    };

    const handleBlur = () => {

    }

    const handleSubmit = () => {
        setSearchText(prev => searchRef.current.value)

    }


    return (
        <div className='h-90 flex flex-col md:max-h-[26rem] lg:max-h-[40rem] justify-between gap-4 '>

            <div class="   ">

                <form  >
                    <div className='    '>


                        <div className='bg-blue-800 text-slate-900 mx-10 p-2 rounded-xl   '>



                            <div className='flex flex-row flex-nowrap gap-2 justify-between'>
                                <div className='flex-1'>
                                    <label htmlFor={'searchRef'}
                                        className='text-blue-300 font-semibold mb-2'  >{'Search user'}</label>
                                    <input
                                        ref={searchRef}
                                        name='searchRef'
                                        type={'text'}
                                        placeholder={`Enter search here`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={''}
                                        className={`  input mb-0 input-bordered input-primary text-blue-200   }`}
                                    />
                                </div>
                                <div className='w-1/6   mx-auto flex flex-col justify-center items-center border-t-2
                      border-blue-300/0 mt-2 py-3'>

                                    <button type="button" onClick={handleSubmit}
                                        className='btn btn-primary  '>Search
                                    </button>
                                </div>
                            </div>

                            <div className='stripe flex flex-row gap-1 mb-2'>
                                {Array.from({ length: 91 - 65 }, (_, i) => 65 + i).map((x, i) => (
                                    <div key={i} className='p-1 bg-slate-900/90 text-blue-600 rounded-md w-5 h-5
        flex justify-center items-center
        cursor-pointer text-xs font-semibold
        hover:bg-blue-600/90 hover:text-slate-800
        active:bg-slate-600/90 active:text-yellow-600
        '
                                        onClick={() => setSearchText(prev => String.fromCharCode(x))}
                                    >{String.fromCharCode(x)}</div>
                                ))}
                            </div>



                        </div>


                    </div>



                </form>
            </div>


            <div className='flex-1 flex   flex-col gap-2 p-4 mb-4 pb-20  bg-slate-800/5 overflow-y-scroll'>

                {
                    userData && userData.map((user, index) => (
                        <UserPanel key={index} user={user} initialValues={initialValues} entryMode={entryMode}
                            setSearching={setSearching}
                            setSelectedUser={setSelectedUser}
                        />

                    ))
                }
            </div>



        </div>
    )
}
const UserPanel = ({ user, initialValues, entryMode, setSearching, setSelectedUser }) => {
    const addTransport = (id) => {
        setSelectedUser(prev => user)
        initialValues.user_id = id
        setSearching(prev => !prev)
    }

    return (
        <div className='flex flex-row justify-between items-center bottom-2 border-blue-400/30 border-2 rounded-xl p-2'>
            <div>
                <div> <span>{Capitalize( user.user_type)}: </span> {user.name}</div>

                {
                    user.student_session &&
                    <div className='flex flex-row gap-3'>
                        <span> <span className='text-blue-400'>{user.student_session.academic_class.name}</span></span>
                        <span>Section: <span className='text-red-400'>{user.student_session.section.name}</span></span>
                        <span>Roll: <span className='text-green-400'>{user.student_session.roll_no}</span></span>

                    </div>
                }
                {
                    user.student_session && user.transport_user &&
                    <div className='flex flex-row gap-3'>
                        <span> Transport: <span className='text-blue-400'>{user.transport_user.transport.name}</span></span>
                        <span>Monthly Charge: <span className='text-red-400'>
                            {user.transport_user.is_free ? 'Free' : user.transport_user.monthly_charge}
                        </span>
                        </span>
                        <span>Status: <span className='text-green-400'>{user.transport_user.is_active?'active':'in-active'}</span>
                        </span>

                    </div>

                }
            </div>
            {/* {console.log(user.student_session.academic_session_id,user.transport_user.academic_session_id)} */}
            <div>
                {/* { user.student_session && user.transport_user && (user.student_session.academic_session_id==user.transport_user.academic_session_id)?'active':'not-active'} */}
                {user.student_session && user.transport_user ?
                    <button onClick={() => addTransport(user.id)} className='btn btn-sm btn-primary btn-rounded'>Change Info</button>
                    :
                    <button onClick={() => addTransport(user.id)} className='btn btn-sm btn-primary btn-rounded'>Add Transport</button>
                }
            </div>
        </div>
    )
}
const SelectedUserPanel = ({ selectedUser: user, setSearching, entryMode }) => {
    const switchUser = () => {
        setSearching(prev => !prev)
    }
    return (
        <div className='flex flex-row justify-between items-center bottom-2 border-blue-400/30 border-2 rounded-xl p-2 m-2'>
            <div> {user.name}</div>
            <div>
                {entryMode == 'create' &&
                    <button onClick={switchUser} className='btn btn-sm btn-primary btn-rounded'>Switch User</button>
                }
            </div>
        </div>
    )
}