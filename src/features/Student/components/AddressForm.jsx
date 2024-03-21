import React, { useState } from 'react'
import FormikFormModal from '../../../components/form-components/FormikFormModal';
import { MdOutlineCloseFullscreen } from 'react-icons/md';
import { useFormik } from 'formik';
import { useStoreStudentAddressMutation, useUpdateStudentAddressMutation } from '../hooks/mutations';
import { useAddressType } from '../../../hooks/queries';
import { FormikInputBox, FormikSelect, FormikSubmit } from '../../../components/form-components';

const AddressForm = ({ mode, address, setMode, student_id }) => {
    const [open, setOpen] = useState(true);
    const addressTypeData = useAddressType()
    if (addressTypeData.isPending) return '<div>Loading..</div>'
    if (addressTypeData.isError) {
        return <div>{addressTypeData.error.message}</div>
    }


    const studentAddressStoreMutation = useStoreStudentAddressMutation();
    const studentAddressUpdateMutation = useUpdateStudentAddressMutation()

    const initialValues = address
    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            studentAddressStoreMutation.mutate(values)
        } else {
            studentAddressUpdateMutation.mutate(values)
        }
    }
    const formikAddress = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: values => {
            const newValues = { ...initialValues, ...values }
            console.log(newValues);
            handleFormSubmit(newValues)
        }
    })

    const handleClose = () => {
        setOpen(false);
        setMode('list')

    };
    return (
        <FormikFormModal isOpen={open} onClose={handleClose}>
            <div className='flex justify-between items-center border-b-2 border-slate-600/50 pb-2   ' >
                <div>New Address</div>
                <button onClick={handleClose} type="button"
                    className='rounded-full p-2
                 bg-slate-50/5 text-orange-500 cursor-pointer
                  hover:text-yellow-500 hover:bg-slate-600
                   active:text-orange-600 active:touch-pinch-zoom '>
                    <MdOutlineCloseFullscreen className='text-xl active:scale-90 transition delay-75 ease-in-out ' />
                </button>
            </div>
            <form onSubmit={formikAddress.handleSubmit}>
                <div className="grid grid-cols-2 gap-4 ">
                    <div className="">
                        {addressTypeData.data &&
                            <FormikSelect formik={formikAddress} name="address_type" label="Type"
                                options={
                                    addressTypeData.data.data && Object.entries(addressTypeData.data.data).map(([key, value], index) => (
                                        <option key={index} value={key}>{value}</option>
                                    ))
                                } />
                        }
                    </div>
                    <div className="">
                        <FormikInputBox formik={formikAddress} name="name" label="Name" />
                    </div>
                    <div className="">
                        <FormikInputBox formik={formikAddress} name="contact_no" label="Contact Number" />
                    </div>
                    <div className="">
                        <FormikInputBox formik={formikAddress} name="email" label="Email" />
                    </div>
                    <div className="col-span-2 mx-auto">
                        <FormikSubmit formik={formikAddress} label={"Save"} />
                    </div>
                </div>


            </form>
        </FormikFormModal>
    )
}

export default AddressForm