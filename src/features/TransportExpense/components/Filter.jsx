import React, { memo, useEffect, useMemo, useState } from 'react'

import { useFormik } from 'formik'

import * as Yup from "yup";
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { CampusSelect } from '../../Common/components/CampusSelect';
import { FormikInputBox, FormikSubmit } from '../../../components/form-components';
import { DateTime } from 'luxon';




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


const Filter = ({ TransportExpenseData,  initialFilterValues, setFilterReady  }) => {

const [isLoading, setIsLoading] = useState(false)

    //  console.log(initialFilterValues);
    // console.log(DateTime.fromISO(new Date().toLocaleString(DateTime.DATE_MED) ));
    //  const mData = TransportExpenseData.data?.data ?? [];
    const formik = useFormik({
        initialValues:initialFilterValues,
        // validationSchema,
        enableReinitialize: true,
        onSubmit: (values,{setSubmitting}) => {
            Object.assign(initialFilterValues, values)
             TransportExpenseData.refetch()
              setSubmitting(false)
             TransportExpenseData.data??setFilterReady(true)
        },
        onError: (errors, values,{setSubmitting}) => {
            setSubmitting(false)

        }
    })
    // if(TransportExpenseData.isFetching) return <div>Loading</div>

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6 border-b-2   border-blue-300/30 pb-2 px-4 mb-2 '>
                            <div className='grid gap-4 grid-cols-12   mb-2'>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}
                                <div className='col-span-3 '>
                                <CampusSelect formik={formik} auto={false} isLoading={isLoading} setIsLoading={setIsLoading}/>

                                </div>
                                {/* <div className='col-span-2 hidden'>

                                    <AcademicSessionSelect formik={formik} />

                                </div> */}
                                <div className='col-span-3 '>

                                    <FormikInputBox type={'date'} formik={formik} name={'from'} label={'From'}/>

                                </div>
                                <div className='col-span-3 '>

                                    <FormikInputBox type={'date'} formik={formik} name={'to'} label={'To'}/>

                                </div>


                                {formik.values &&
                                    <div className='col-span-1 flex flex-col justify-end '>

                                        <FormikSubmit formik={formik} label={'Filter'} />
                                    </div>
                                }
                                 <div className='col-span-3 '>  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Filter

