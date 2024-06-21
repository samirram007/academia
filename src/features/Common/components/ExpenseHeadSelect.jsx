import React from 'react';
import Loader from '../../../components/Loader';
 
import { CustomSelect } from './CustomSelect';
import { useExpenseHeads } from '../../ExpenseHead/hooks/queries';

export const ExpenseHeadSelect = ({ formik, expense_group_ids,  name,label,exclude }) => {


    const ExpenseHeadData = useExpenseHeads({expense_group_ids:expense_group_ids??[]});
    if (ExpenseHeadData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"expense_head_id"} label={label??'ExpenseHead'}
            options={ExpenseHeadData.data && ExpenseHeadData.data.data &&
                ExpenseHeadData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
