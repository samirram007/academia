import React, { useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io';
import AddressForm from './AddressForm';
import { useAddressType } from '../../../hooks/queries';
import { AiOutlineEdit } from 'react-icons/ai';

const Addresses = ({ formik }) => {
  const student_id = formik.values.id;
  const [mode, setMode] = useState('list');
  const initialValue = {
      address_type: 'guardian',
      guardian_id: 1,
      student_id: 1,
      name: '',
      email: '',
      contact_no: ''
  }

  return (
    <div className='grid gap-4 grid-cols-6 border-t-2 border-blue-300/30 pt-2  mt-10'>
        <div className='col-span-6 '>
            <div className='flex justify-between items-center'>

                <div>Address</div>
                <div>
                    <span
                        onClick={()=>setMode('add')}
                        className=" bg-slate-50 text-orange-500 cursor-pointer
                     hover:text-yellow-500 active:text-orange-600 active:touch-pinch-zoom ">
                        <IoMdAddCircle className='text-3xl active:scale-90 transition delay-75 ease-in-out ' />
                    </span>

                    {mode == 'add' && <AddressForm mode='add'
                        address={initialValue}
                        student_id={student_id}
                        setMode={setMode} />}
                </div>
            </div>
        </div>
        {
            <div className='  col-span-6 '>
                {
                    formik.values.addresses && formik.values.addresses.length > 1 ?
                        <>
                            <div className='col-span-6 flex flex-row p-1
                        bg-slate-800/80
                        flex-nowrap  items-center justify-between
                        font-bold
                        text-xs border-y-2 rounded-2xl border-blue-200/50'>
                                <div className='flex flex-nowrap  justify-start flex-1  '>

                                    <div className='text-left w-32'>Type</div>
                                    <div>Address</div>
                                </div>
                                <div className=''>Action</div>
                            </div>

                            {
                                formik.values.addresses.map((address, index) => {
                                    return <AddressView
                                        key={index}
                                        address={address}
                                        student_id={student_id} />

                                })
                            }

                        </>
                        : <div> No Address Data Found  </div>

                }


            </div>

        }


    </div>
)
}

export default Addresses

export const AddressView = ({ address,student_id }) => {
    const [mode, setMode] = useState('list');
  const addressTypeData = useAddressType()
  if (addressTypeData.isPending) return '<div>Loading..</div>'
  if (addressTypeData.isError) {
      return <div>{addressTypeData.error.message}</div>
  }

  //console.log(address);

  return (
      <div className='col-span-6 flex flex-row items-center justify-between border-b-[1px] border-violet-200/20'>
          <div className='flex flex-row justify-start tracking-tighter'>
              <div className='text-left w-32'>
                  {addressTypeData.data.data[address.address_type]}</div>
              <div> {address.display}</div>
          </div>
          <AiOutlineEdit onClick={()=>setMode('edit')} className='badge text-violet-400 cursor-pointer border-2 border-violet-300/30
            hover:border-violet-300
            active:bg-blue-700/30
            active:border-blue-400/30
            active:scale-90  transition delay-75 ease-in-out' />
            {mode == 'edit' && <AddressForm mode='edit'
                            address={address}
                            student_id={student_id}
                            setMode={setMode} />}
      </div>
  )

}