import React, { memo, useEffect, useMemo } from 'react'

import { useFormik } from 'formik'
import { FormikSelect, FormikSubmit } from '../../../components/form-components'
import * as Yup from "yup";

import { CampusSelect } from './CampusSelect'
import { useCampuses } from '../../Campus/hooks/queries';
import { AcademicYearSelect } from './AcademicYearSelect';
import { AcademicClassSelect } from './AcademicClassSelect';


const validationSchema = Yup.object().shape({
    campus_id: Yup.number().integer()
    //     .min(1, "Please select Campus")
    //     .required("Please select Campus"),
    // academic_year_id: Yup.number().integer()
    //     .min(1, "Please select Academic year")
    //     .required("Please select Academic year"),
    // academic_class_id: Yup.number().integer()
    //     .min(1, "Please select Class")
    //     .required("Please select Class")
})


const FeeTemplateFilter = ({ FeeTemplateData, initialValues }) => {
    const CampusData = useCampuses()
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            Object.assign(initialValues, values);
            FeeTemplateData.refetch()
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

                                    {CampusData.data &&
                                        <CampusSelect
                                            formik={formik}
                                            name="campus_id" label={'Campus'}
                                            options={
                                                CampusData.data.data &&
                                                CampusData.data.data.map(({ id: key, name: value }, index) => (
                                                    <option key={index} value={key}>{value}</option>
                                                ))
                                            } />
                                    }


                                </div>
                                <div className='col-span-3 '>

                                    <AcademicYearSelect formik={formik} campus_id={formik.values.campus_id} />

                                </div>
                                <div className='col-span-3 '>

                                    <AcademicClassSelect formik={formik} campus_id={formik.values.campus_id} />


                                </div>

                                {formik.values.campus_id &&
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

export default FeeTemplateFilter

