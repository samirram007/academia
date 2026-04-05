import { useState } from 'react';

import { useFormik } from 'formik';

import * as Yup from "yup";

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';




const validationSchema = Yup.object().shape({

    // academic_session_id: Yup.number().integer()
    //     .min(1, "Please select Academic session")
    //     .required("Please select Academic session"),
    // academic_class_id: Yup.number().integer()
    //     .min(1, "Please select Class")
    //     .required("Please select Class")
})


const Filter = ({ ExpenseData,  initialFilterValues, setFilterReady  }) => {

const [isLoading, setIsLoading] = useState(false)

    //  console.log(initialFilterValues);
    // console.log(DateTime.fromISO(new Date().toLocaleString(DateTime.DATE_MED) ));
    //  const mData = ExpenseData.data?.data ?? [];
    const formik = useFormik({
        initialValues:initialFilterValues,
        // validationSchema,
        enableReinitialize: true,
        onSubmit: (values,{setSubmitting}) => {
            Object.assign(initialFilterValues, values)
             ExpenseData.refetch()
              setSubmitting(false)
             ExpenseData.data??setFilterReady(true)
        },
        onError: (errors, values,{setSubmitting}) => {
            setSubmitting(false)

        }
    })
    // if(ExpenseData.isFetching) return <div>Loading</div>

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-wrap items-end gap-4'>
                <div className='w-56'>
                    <AcademicSessionSelect formik={formik} />
                </div>
                <div className='w-56'>
                    <FormikInputBox type={'date'} formik={formik} name={'from'} label={'From'} />
                </div>
                <div className='w-56'>
                    <FormikInputBox type={'date'} formik={formik} name={'to'} label={'To'} />
                </div>

                {formik.values &&
                    <FormikSubmit formik={formik} label={'Filter'} />
                }
            </div>
        </form>
    )
}

export default Filter

