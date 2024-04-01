import React, { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from "yup";
import { FormikHiddenInput, FormikInputBox, FormikSelect, FormikSubmit, ImageBox } from '../../../components/form-components'
import { useCampuses } from '../../Campus/hooks/queries';
import { useDeleteEducationBoardMutation, useStoreEducationBoardMutation, useUpdateEducationBoardMutation } from '../hooks/mutations';
import { CampusSelect } from '../../Common/components/CampusSelect';
import { FormikCheckBox, FormikInputBox } from '../../../components/form-components';

import {
    useCaste, useGender,
    useLanguage, useNationality, useReligion
} from '../../../hooks/queries'



import Guardians from './Guardians';
import Addresses from './Addresses';
import { useCampuses } from '../../Campus/hooks/queries';
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),

})


const EntryForm = ({ initialValues, entryMode }) => {
    const schoolTypeData = useSchoolType()
    const genderData = useGender()
    const nationalityData = useNationality()
    const religionData = useReligion()
    const casteData = useCaste()
    const languageData = useLanguage()


    const [checked, setChecked] = useState(false)

    const educationBoardStoreMutation = useStoreEducationBoardMutation()
    const educationBoardUpdateMutation = useUpdateEducationBoardMutation()
    const educationBoardDeleteMutation = useDeleteEducationBoardMutation()

    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            educationBoardStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {
            educationBoardUpdateMutation.mutate(values)
        } else if (entryMode === 'delete') {
            educationBoardDeleteMutation.mutate(values)
        }
        else {
            console.log('Invalid entry mode')
        }
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            console.log(values);
            handleFormSubmit(values)
        }
    })
    if (campuses.isLoading) {
        return (<div>Loading...</div>)
    }
    return (
        <div>

            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6 md:col-span-4 border-b-2 md:border-r-2 md:border-b-0 border-blue-300/30 pb-2 px-4 mb-2 '>
                            <div className='grid gap-4 grid-cols-6  border-b-2 border-blue-300/30 pb-2  mb-2'>
                                <div className='col-span-6 md:col-span-6'>

                                    <FormikInputBox formik={formik} name="name" label="Name" />

                                </div>
                                <div className='col-span-6 md:col-span-3'>
                                    <FormikInputBox formik={formik} name="dob" type={'date'} label="Date of Birth" />
                                </div>

                                <div className=' col-span-6 md:col-span-3'>

                                    {genderData.data &&
                                        <FormikSelect formik={formik} name="gender" label="Gender"
                                            options={
                                                genderData.data.data && Object.entries(genderData.data.data).map(([key, value], index) => (
                                                    <option key={index} value={key}>{value}</option>
                                                ))
                                            } />
                                    }

                                </div>
                            </div>
                            <div className='grid gap-4 grid-cols-6 border-b-2 border-blue-300/30 pb-2  mb-2'>
                                <div className='  col-span-6 md:col-span-3 '>
                                    <FormikInputBox formik={formik} name="birth_mark" type={'text'} label="Birth Mark" />

                                </div>
                                <div className='  col-span-6 md:col-span-3 '>
                                    <FormikInputBox formik={formik} name="aadhaar_no" type={'text'} label="Aadhaar Number" />

                                </div>

                            </div>
                            <div className='grid gap-4 grid-cols-6 border-b-2 border-blue-300/30 pb-2  mb-2'>
                                <div className='  col-span-6 md:col-span-3 '>
                                    <FormikInputBox formik={formik} name="email" type={'email'} label="Email" />


                                </div>
                                <div className='  col-span-6 md:col-span-3 '>
                                    <FormikInputBox formik={formik} name="contact_no" type={'text'} label="Contact Number" />

                                </div>

                            </div>
                            <div className='grid gap-4 grid-cols-6'>
                                <div className='  col-span-6 md:col-span-3 '>
                                    {nationalityData.data &&
                                        <FormikSelect formik={formik} name="nationality" label="Nationality"
                                            options={
                                                nationalityData.data.data && Object.entries(nationalityData.data.data).map(([key, value], index) => (
                                                    <option key={index} value={key}>{value}</option>
                                                ))
                                            } />
                                    }
                                </div>
                                <div className='  col-span-6 md:col-span-3 '>
                                    {languageData.data &&
                                        <FormikSelect formik={formik} name="language" label="Language"
                                            options={
                                                languageData.data.data && Object.entries(languageData.data.data).map(([key, value], index) => (
                                                    <option key={index} value={key}>{value}</option>
                                                ))
                                            } />
                                    }

                                </div>
                                <div className='  col-span-6 md:col-span-3 '>
                                    {religionData.data &&
                                        <FormikSelect formik={formik} name="religion" label="Religion"
                                            options={
                                                religionData.data.data && Object.entries(religionData.data.data).map(([key, value], index) => (
                                                    <option key={index} value={key}    >{value}</option>
                                                ))
                                            } />
                                    }
                                </div>
                                <div className=' col-span-6 md:col-span-3 '>

                                    {casteData.data &&
                                        <FormikSelect formik={formik} name="caste" label="Caste"
                                            options={
                                                casteData.data.data && Object.entries(casteData.data.data).map(([key, value], index) => (
                                                    <option key={index} value={key}    >{value}</option>
                                                ))
                                            } />
                                    }
                                </div>
                            </div>
                            {entryMode == 'edit' &&
                                <>
                                    <Guardians formik={formik} name="guardians" label="Guardian" />
                                    <Addresses formik={formik} name="addresses" label="Address" />
                                </>
                            }



                        </div>
                        <div className='col-span-6 md:col-span-2'>
                            <div className='col-span-6 md:col-span-4'>
                                <ImageBox formik={formik} name="profile_document_id" editable={true} resource="profile_document" />
                            </div>
                            <div className='col-span-6 md:col-span-4'>
                                {campuses.data &&
                                    <FormikSelect formik={formik} name="campus_id" label="Campus"
                                        options={
                                            campuses.data.data &&
                                            campuses.data.data.map(({ id: key, name: value }, index) => (
                                                <option key={index} value={key}>{value}</option>
                                            ))
                                        } />
                                }
                            </div>
                            <div className='col-span-6 md:col-span-4 mt-2'>
                                <FormikInputBox formik={formik} name="admission_no" label="Admission No" />
                            </div>
                            <div className='col-span-6 md:col-span-4'>
                                <FormikInputBox formik={formik} name="admission_date" type={"date"} label="Admission Date" />
                            </div>

                            <div className='mx-auto flex flex-col justify-center items-center border-t-2 border-blue-300/10 mt-2 pt-6'>
                                <div className='flex gap-2 items-center text-red-600'>

                                    {entryMode === 'delete' && "Are your sure you want to delete this entry?"}
                                </div>
                                <button type="submit" className='btn btn-primary btn-wide'>
                                    {entryMode === 'delete' ? 'Delete' : 'Save'}
                                    {formik.isSubmitting && (
                                        <span
                                            className='spinner-border spinner-border-sm ms-2'
                                            role='status'
                                            aria-hidden='true'
                                        ></span>
                                    )}
                                </button>
                            </div>

                        </div>


                    </div>

                    <div className='order-first'>

                        <div className="form-control ">
                            {/* <FormikCheckBox formik={formik} name="is_current" type={"checkbox"} label="Is Current?" /> */}

                        </div>


                    </div>
                </div>


            </form>
        </div>
    )
}

export default EntryForm