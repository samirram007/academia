import React, { memo, useEffect, useMemo, useState } from 'react'

import { useFormik } from 'formik'
import { FormikSelect, FormikSubmit } from '../../../components/form-components'
import * as Yup from "yup";

import { CampusSelect } from '../../Common/components/CampusSelect'

import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { AcademicClassSelect } from '../../Common/components/AcademicClassSelect';


const validationSchema = Yup.object().shape({
    campus_id: Yup.number().integer()
    //     .min(1, "Please select Campus")
    //     .required("Please select Campus"),
    // academic_session_id: Yup.number().integer()
    //     .min(1, "Please select Academic session")
    //     .required("Please select Academic session"),
    // academic_class_id: Yup.number().integer()
    //     .min(1, "Please select Class")
    //     .required("Please select Class")
})


const Filter = ({ fetchedData, initialFilterValues }) => {

const [isLoading, setIsLoading] = useState(fetchedData.isLoading)
    const formik = useFormik({
        initialValues:initialFilterValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            Object.assign(initialFilterValues, values);
            fetchedData.refetch()
        }
    })


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6 border-b-2   border-blue-300/30 pb-2 px-4 mb-2 '>
                            <div className='grid gap-4 grid-cols-12   mb-2'>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}
                                <div className='col-span-3 '>
                                <CampusSelect formik={formik} auto={true} isLoading={isLoading} setIsLoading={setIsLoading}/>

                                </div>
                                <div className='col-span-3 '>

                                    <AcademicSessionSelect formik={formik} campus_id={formik.values.campus_id} />

                                </div>
                                <div className='col-span-3 '>

                                    <AcademicClassSelect formik={formik} campus_id={formik.values.campus_id} />


                                </div>

                                {formik.values &&
                                    <div className='col-span-2 flex flex-col justify-end '>

                                        <FormikSubmit formik={formik} label={'Filter'} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Filter

