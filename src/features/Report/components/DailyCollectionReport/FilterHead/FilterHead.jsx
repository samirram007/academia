

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import { useFormik } from 'formik';

const FilterHead = ({ initialFilterValues, fetchedData }) => {


    const formik = useFormik({
        initialValues: initialFilterValues,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            Object.assign(initialFilterValues, values);

            fetchedData.refetch();
            setSubmitting(false);
        },
        onError: (errors, values, { setSubmitting }) => {
            setSubmitting(false);
        },
    })

    return (
        <div>
            <div className='grid grid-cols-1 '>
                <div className='grid grid-flow-row grid-cols-6 gap-5 md:grid-flow-col'>
                    <div className='grid col-span-6 gap-4 px-4 pb-2 mb-2 border-b-2 border-blue-300/30 '>


                        <form onSubmit={formik.handleSubmit} className='flex flex-row items-center justify-center flex-1 gap-2'>
                            <div className='grid grid-cols-12 gap-4 mb-2'>
                                <div className='col-span-6 flex flex-row gap-2 pt-4 '>
                                    <span>Period</span>
                                    <FormikInputBox type="date" formik={formik} name="from" label="" />
                                    <span>To</span>
                                    <FormikInputBox type="date" formik={formik} name="to" label="" />
                                    <FormikSubmit formik={formik} label={'Filter'} />
                                </div>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterHead
