import { Formik, Form, Field, useFormik, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'


import Breadcrumbs from '../../Breadcrumbs';
import Select from 'react-select';
import * as Yup from "yup";
import { useStoreAcademicClassMutation } from '../hooks/mutations';
import { useCampuses } from '../../Campus/hooks/queries';
const validationSchema = Yup.object().shape({
    session: Yup.string()
        .required("Session is required"),
    start_date: Yup.date()
        .typeError('Invalid date format')
        .required('Start Date is required'),
    end_date: Yup.date()
        .typeError('Invalid date format')
        .when('start_date', (start_date, schema) => {
            return (start_date ? schema.min(start_date, 'End date must be later than the start date') : schema)
        }),
    campus_id: Yup.number().integer()
        .min(1, "Please select Campus")
        .required("Please select Campus")
})



const CreateAcademicClass = () => {

    const campuses = useCampuses()
    const academicClassMutation = useStoreAcademicClassMutation()
    const [checked, setChecked] = useState(false)

    const editData = {
        session: '2025-2026',
        start_date: new Date().toISOString().slice(0, 10),
        end_date: new Date().toISOString().slice(0, 10),
        is_current: false,
        campus_id: 2

    }
    const initialValues = editData ?? {
        session: '2024-2025',
        start_date: new Date().toISOString().slice(0, 10),
        end_date: new Date().toISOString().slice(0, 10),
        is_current: false,
        campus_id: 0

    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            academicClassMutation.mutate(values)
        },

    });

    if (campuses.isLoading) {

        return (<div>Loading...</div>)
    }

    // if (campuses.data.data.length > 0) {

    //     formik.values.campus_id = campuses.data.data[0].id


    // }

    return (
        <div className='pb-10'>
            <div className='row  flex flex-col md:flex-row justify-between gap-2 border-b-2 border-blue-300/10 pb-2 mb-2 '>
                <div className='flex flex-col gap-2 flex-1 text-3xl'>
                    {/* {'Create Academic Session'} */}
                    <Breadcrumbs />
                </div>
                <div className='flex flex-row gap-2 flex-1'>

                </div>
                <div className='flex flex-row gap-2 justify-center flex-1 items-center'>

                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>


                    <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                        <div>
                            <label htmlFor="campus_id">Campus</label>
                            {campuses.data &&

                                <select name="campus_id" id="campus_id"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    defaultValue={formik.values.campus_id}
                                    className={`select  w-full max-w-xs ${formik.errors.campus_id ? 'select-error' : 'select-primary'}`}
                                >
                                    <option value='0'      >-- please select</option>
                                    {campuses.data.data && campuses.data.data.map((campus, index) => (
                                        <option key={campus.id} value={campus.id}    >{campus.name}</option>
                                    ))}
                                </select>
                            }


                            {formik.errors.campus_id ? <div className='text-error'>{formik.errors.campus_id}</div> : null}
                        </div>
                        <div>
                            <label htmlFor="session">Session</label>
                            <input
                                id="session"
                                name="session"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.session}
                                className={`input input-bordered input-primary w-full max-w-xs ${formik.errors.session ? 'input-error' : ''}`}
                            />
                            {formik.errors.session ? <div className='text-error'>{formik.errors.session}</div> : null}
                        </div>
                        <div>
                            <label htmlFor="start_date">Start Date</label>
                            <input
                                id="start_date"
                                name="start_date"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.start_date}
                                className={`input input-bordered input-primary w-full max-w-xs ${formik.errors.start_date ? 'input-error' : ''}`}
                            />
                            {formik.errors.start_date ? <div className='text-error'>{formik.errors.start_date}</div> : null}
                        </div>
                        <div>
                            <label htmlFor="end_date">End Date</label>
                            <input
                                id="end_date"
                                name="end_date"
                                type="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.end_date}
                                className={`input input-bordered input-primary w-full max-w-xs ${formik.errors.end_date ? 'input-error' : ''}`}
                            />
                            {formik.errors.end_date ? <div className='text-error'>{formik.errors.end_date}</div> : null}
                        </div>
                    </div>

                    <div className='order-first'>

                        <div className="form-control ">
                            <label className="label cursor-pointer justify-end gap-4">
                                <span className="label-text">Is Current?</span>
                                <input type="checkbox" id="is_current"
                                    name="is_current"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.is_current}
                                    defaultChecked={formik.values.is_current}
                                    className= {`checkbox  m-0 ${formik.errors.is_current ? 'checkbox-error' : 'checkbox-primary'}`} />

                            </label>
                            {formik.errors.is_current ? <div className='text-error'>{formik.errors.is_current}</div> : null}
                        </div>


                    </div>
                </div>

                <div className='mx-auto flex justify-center items-center border-t-2 border-blue-300/10 mt-2 pt-6'>
                    <button type="submit" className='btn btn-primary btn-wide'>
                        Save
                        {formik.isSubmitting && (
                            <span
                                className='spinner-border spinner-border-sm ms-2'
                                role='status'
                                aria-hidden='true'
                            ></span>
                        )}
                    </button>
                </div>

            </form>


        </div>
    )
}


export default CreateAcademicClass