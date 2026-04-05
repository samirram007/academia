

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
        <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-wrap items-end gap-4 px-5 py-3'>
                <div className='flex flex-row items-end gap-2'>
                    <span className='text-sm text-slate-500 dark:text-slate-400 pb-2'>Period</span>
                    <FormikInputBox type="date" formik={formik} name="from" label="" />
                </div>
                <div className='flex flex-row items-end gap-2'>
                    <span className='text-sm text-slate-500 dark:text-slate-400 pb-2'>To</span>
                    <FormikInputBox type="date" formik={formik} name="to" label="" />
                </div>
                <FormikSubmit formik={formik} label={'Filter'} />
            </div>
        </form>
    )
}

export default FilterHead
