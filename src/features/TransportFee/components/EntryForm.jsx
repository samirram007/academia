
import React, { useEffect, useRef, useState } from 'react'
import * as Yup from "yup";

import { useTransportUserSearch } from '../../TransportUser/hooks/quaries';
import InputForm from './InputForm';
import { Capitalize } from '../../../libs/utils';
const validationSchema = Yup.object().shape({
    total_amount: Yup.string()
        .required("Amount is required"),
})

const EntryForm = ({ initialValues, entryMode }) => {

    const [isSearching, setSearching] = useState(true)
    const [selectedTransportUser, setSelectedTransportUser] = useState({})
    const [defaultMonthlyCharge, setDefaultMonthlyCharge] = useState(0)
    useEffect(() => {
        if (entryMode == 'edit') {
            setSearching(prev => false)
            setSelectedTransportUser(prev => initialValues.transport_user)
        }
    }, [])


    return (
        <div className='relative h-[91vh] w-full'>
            {
                isSearching ?
                    <SearchUser initialValues={initialValues} entryMode={'search'}
                        setSearching={setSearching}
                        setSelectedTransportUser={setSelectedTransportUser} />
                    :
                    selectedTransportUser &&
                    <>

                        <InputForm initialValues={initialValues}
                            entryMode={entryMode}
                            selectedTransportUserPanel={<SelectedUserPanel selectedTransportUser={selectedTransportUser}
                                setSearching={setSearching} entryMode={entryMode} />}
                            selectedTransportUser={selectedTransportUser}
                            defaultMonthlyCharge={defaultMonthlyCharge}
                            setDefaultMonthlyCharge={setDefaultMonthlyCharge}
                        />
                    </>
            }
        </div>
    )
}

export default EntryForm
export const SearchUser = ({ initialValues, entryMode, setSearching, setSelectedTransportUser }) => {
    const searchRef = useRef()
    const [searchText, setSearchText] = useState({ searchText: '' })
    const [inputText, setInputText] = useState({ searchText: '' })
    const [debouncedValue, setDebouncedValue] = useState('');
    const userData = useTransportUserSearch({ searchText })
    console.log(userData)
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
    const handleAlphabetClick = (alphabet) => {
        searchRef.current.value = alphabet
        setSearchText(prev => searchRef.current.value)
    }


    return (
        <div className='h-90 flex flex-col md:max-h-[26rem] lg:max-h-[40rem] justify-between gap-4 '>
            <div className="   ">
                <form  >
                    <div className='    '>


                        <div className='bg-blue-800 text-slate-900 mx-10 p-2 rounded-xl   '>



                            <div>
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

                            <div className='stripe flex flex-row gap-1 my-2'>
                                {Array.from({ length: 91 - 65 }, (_, i) => 65 + i).map((x, i) => (
                                    <div key={i} className='p-1 bg-slate-900/90 text-blue-600 rounded-md w-5 h-5
        flex justify-center items-center
        cursor-pointer text-xs font-semibold
        hover:bg-blue-600/90 hover:text-slate-800
        active:bg-slate-600/90 active:text-yellow-600
        '
                                        onClick={() => handleAlphabetClick(String.fromCharCode(x))}
                                    // onClick={() => setSearchText(prev => String.fromCharCode(x))}
                                    >{String.fromCharCode(x)}</div>
                                ))}
                            </div>


                            <div className='  mx-auto flex flex-col justify-center items-center border-t-2
                      border-blue-300/10 mt-2 py-3'>

                                <button type="button" onClick={handleSubmit} className='btn btn-primary btn-wide'>Search
                                </button>
                            </div>
                        </div>


                    </div>



                </form>
            </div>
            <div className='flex-1 flex   flex-col gap-2 p-4 mb-4 pb-20  bg-slate-800/5 overflow-y-scroll'>

                {
                    userData.data && userData.data.data.map((user, index) => (
                        <UserPanel key={index} data={user} user={user.user}
                            initialValues={initialValues} entryMode={entryMode}
                            setSearching={setSearching}
                            setSelectedTransportUser={setSelectedTransportUser}
                        />

                    ))
                }
            </div>
        </div>
    )
}
const UserPanel = ({ user, data, initialValues, entryMode, setSearching, setSelectedTransportUser }) => {

    const handleUserSelection = () => {
        if(data.user.user_type==='student')
            {
            if(data.student_session && initialValues.academic_session_id == data.student_session.academic_session_id){
                setSelectedTransportUser(prev => data)
                initialValues.user_id = data.user_id
            }
        }
        if(data.user.user_type==='teacher'){
            setSelectedTransportUser(prev => data)
            initialValues.user_id = data.user_id
        }


        setSearching(prev => !prev)
    }
    //console.log(user);
    return (
        <div className='flex flex-row justify-between items-center bottom-2 border-blue-400/30 border-2 rounded-xl p-2'>
            <div className='flex flex-col gap-2'>

                <div className='flex flex-row items-center gap-2'>
                    <span className='badge bg-yellow-400 text-slate-800 uppercase'> {user.user_type}</span>
                    <span className='font-bold text-md'>{user.name} </span>
                </div>

                {
                    user.user_type == 'student' &&
                    <div>
                        {
                            (!data.student_session)
                                ? <div className='bg-error text-red-800 px-2 rounded-lg'>Enrollment Pending For current session</div>
                                :
                                <div className='flex flex-row gap-2 bg-green-500 font-semibold text-sm px-2 rounded-2xl shadow-md border-2
                              border-white/20 text-green-900'>
                                    <span>Class:{data.student_session.academic_class.name}</span>
                                    <span>|</span>
                                    <span>Section:{data.student_session.section.name}</span>
                                    <span>|</span>
                                    <span>RollNo:{data.student_session.roll_no}</span>

                                </div>
                        }
                    </div>
                }
                <div>

                    <div className='flex flex-row gap-3'>
                        <span> Transport: <span className='text-blue-400'>{data.transport.name}</span></span>
                        <span>Monthly Charge: <span className='text-red-400'>
                            {data.is_free ? 'Free' : `Rs.${data.monthly_charge}/-`}
                        </span>
                        </span>
                        <span>Status: <span className='text-green-400'>{data.is_active ? 'active' : 'in-active'}</span>
                        </span>

                    </div>
                </div>
            </div>
            <div><button onClick={() => handleUserSelection(user.id)} className='btn btn-sm btn-primary btn-rounded'>Fees</button></div>
        </div>
    )
}
const SelectedUserPanel = ({ selectedTransportUser: data, setSearching, entryMode }) => {
    const switchUser = () => {
        setSearching(prev => !prev)
    }
    return (
        <div className='flex flex-row justify-between items-center bottom-2 border-blue-400/30 border-2 rounded-xl p-2 m-2'>

            <div className=" flex flex-col gap-2">
                <div className='flex flex-row'>


                        <span className='text-green-600 font-bold'>{Capitalize(data.user.user_type)}</span>: {data.user.name}
                        <div className='ml-2'>
                            {entryMode == 'create' &&
                                <button onClick={switchUser} className='badge btn-outline'>Switch User</button>
                            }
                        </div>

                </div>

                {
                    data.user.user_type == 'student' &&
                    <div>
                        {
                            (!data.student_session)
                                ? <div className='bg-error text-red-800 px-2 rounded-lg'>Enrollment Pending For current session</div>
                                :
                                <div className='flex flex-row gap-2 bg-green-500 font-semibold text-sm px-2 rounded-2xl shadow-md border-2
                              border-white/20 text-green-900'>
                                    <span>Class:{data.student_session.academic_class.name}</span>
                                    <span>|</span>
                                    <span>Section:{data.student_session.section.name}</span>
                                    <span>|</span>
                                    <span>RollNo:{data.student_session.roll_no}</span>

                                </div>
                        }
                    </div>
                }
                <div className='flex flex-row gap-3'>
                    <span> Transport: <span className='text-blue-400'>{data.transport.name}</span></span>
                    <span>Monthly Charge: <span className='text-red-400'>
                        {data.is_free ? 'Free' : `Rs.${data.monthly_charge}/-`}
                    </span>
                    </span>
                    <span>Status: <span className='text-green-400'>{data.is_active ? 'active' : 'in-active'}</span>
                    </span>

                </div>
            </div>

        </div>
    )

}


