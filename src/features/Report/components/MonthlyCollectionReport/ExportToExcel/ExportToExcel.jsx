import { download, generateCsv, mkConfig } from 'export-to-csv';
import { RiFileExcel2Line } from 'react-icons/ri';
const ExportToExcel = ({ table }) => {

const csvConfig = mkConfig({
    fieldSeparator: ',',
    filename: 'report', // export file name (without .csv)
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

// Function to flatten the `fee_items` array into separate fields and place `total` at the end
const flattenRowData = (data) => {
    // Collect all unique fee_head_names

    const allFeeHeaders = Array.from(
        new Set(data.flatMap(row => row.months.map(item => item.short_name)))
    );

    return data.map(row => {
        // Initialize an object with all possible fee item headers set to default value
        const monthItems = allFeeHeaders.reduce((acc, header) => {
            acc[header] = '';
            return acc;
        }, {});

        // Fill in the actual amounts for existing fee items
       
        row.months.forEach(item => {
            monthItems[item.short_name] = item.amount;
        });
        console.log('All Headers: ',row)
        // Create a new object excluding the fee_items field and adding feeItems and total at the end
        const { months, total, ...rest } = row;
        return {
            ...rest,
            ...monthItems,
            total: row.months.reduce((sum, item) => sum + (parseInt(item.amount) || 0), 0), // Compute total dynamically
        };
    });
};

// Export function
const exportExcel = () => {
    const rows = table.getRowModel().rows;

    const rowData = rows.map((row) => row.original);
    const flattenedData = flattenRowData(rowData);
   

    const csv = generateCsv(csvConfig)(flattenedData);
    download(csvConfig)(csv);
};

    return (
        <button type="button" className='    btn-ghost btn-rounded' onClick={() => exportExcel()}><RiFileExcel2Line className='text-green-500   text-[24px] ' /></button>
    )
}
export default ExportToExcel;
