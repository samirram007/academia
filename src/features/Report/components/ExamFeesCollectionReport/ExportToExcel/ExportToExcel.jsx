import { all } from 'axios';
import { download, generateCsv, mkConfig } from 'export-to-csv';
import { RiFileExcel2Line } from 'react-icons/ri';
const ExportToExcel = ({ table }) => {

    const csvConfig = mkConfig({
        fieldSeparator: ',',
        filename: 'exam_fees_collection_report', // export file name (without .csv)
        decimalSeparator: '.',
        useKeysAsHeaders: true,
    });

    // Function to flatten the `fee_items` array into separate fields and place `total` at the end
    const flattenRowData = (data) => {
        // STEP 1: find maximum exam fee count
        const maxFeeCount = Math.max(
            ...data.map(row => (row.examFees?.length ?? 0)),
            0
        );

        // STEP 2: normalize each student
        return data.flatMap((row) => {
            const fees = row.examFees ?? [];
            const paddedFees = [...fees];

            // Add pending rows until max count is reached
            while (paddedFees.length < maxFeeCount) {
                paddedFees.push({
                    fee_id: "",
                    fee_no: "Pending",
                    fee_head_name: "Examination Fee",
                    fee_date: "",
                    amount: 0,
                });
            }

            // Flatten
            return paddedFees.map((fee, index) => ({
                StudentID: row.id,
                StudentName: row.student_name,
                Class: row.class,
                Section: row.section,
                RollNo: row.roll_no,
                Session: row.session,

                FeeIndex: index + 1, // optional but useful in Excel

                FeeID: fee.fee_id,
                FeeNo: fee.fee_no,
                FeeHead: fee.fee_head_name,
                FeeDate: fee.fee_date,
                Amount: Number(fee.amount),
            }));
        });
    };

    // Export function
    const exportExcel = () => {
        const rows = table.getRowModel().rows;

        const rowData = rows.map((row) => row.original);
        //  console.log("rows data: ", rowData)
        const flattenedData = flattenRowData(rowData);
        //  console.log("fl data", flattenedData)

        const csv = generateCsv(csvConfig)(flattenedData);
        download(csvConfig)(csv);
    };

    return (
        <button type="button" className='    btn-ghost btn-rounded' onClick={() => exportExcel()}><RiFileExcel2Line className='text-green-500   text-[24px] ' /></button>
    )
}
export default ExportToExcel;
