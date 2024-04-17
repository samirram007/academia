import React from 'react';
import Loader from '../../../components/Loader';

import { CustomSelect } from './CustomSelect';
import { useFeeHeads } from '../../FeeHead/hooks/queries';



export const FeeHeadSelect = ({ formik, auto }) => {

    const FeeHeadData = useFeeHeads();
    if (FeeHeadData.isLoading) return <Loader />;
    return (
        FeeHeadData.data &&
        <HandleSelect
            formik={formik}
            name="fee_head_id"
            label={'Fee Head'}
            auto={auto}
            options={
                FeeHeadData.data.data &&
                FeeHeadData.data.data.map(({ id: key, name: value }, index) => (
                    <option key={index} value={key}>{value}</option>
                ))
            } />
        // <CustomSelect formik={formik} name={name ?? "fee_head_id"}
        //     label={label ?? 'Fee Head '}
        //     options={FeeHeadData.data && FeeHeadData.data.data &&
        //         FeeHeadData.data.data.map(({ id: key, name: value }, index) => (

        //             exclude && exclude === key ? null :
        //                 <option key={index} value={key}>{value}</option>
        //         ))} />

    );

};

export const HandleSelect = (
    { formik, label, name, placeholder, type, ...props }
) => {
    const FeeHeadData = useFeeHeads();
    if (FeeHeadData.isLoading) return <Loader />;

    const handleDropdownChange = (event) => {

        const { name, value } = event.target;
        formik.setFieldValue(name, value); // Update the dropdown field that triggered the change
        //props.auto && formik.handleSubmit()
        // If campus_id dropdown changes, reset academic_session_id and academic_class_id

        if (name === 'fee_head_id') {
            try {
                const nameValue = FeeHeadData.data.data
                    .find(x => x.id == value).name
                formik.setFieldValue('name', nameValue);
            }
            catch (err) {

                formik.setFieldValue('name', '');
            }



        }
    };
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name}
                onChange={handleDropdownChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                className={`select  w-full ${formik.errors[name] ? 'select-error' : 'select-primary'}`}
            >
                <option value='0'      >-- please select</option>
                {props.options}
            </select>
            {formik.touched[name] && formik.errors[name] ? <div className='text-error text-sm pl-2'>{formik.errors[name]}</div> : null}
        </>

    )
}
