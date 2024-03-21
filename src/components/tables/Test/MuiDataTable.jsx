import { useMemo } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  lighten,
  Typography,
} from '@mui/material';

import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { fetchUsers } from '../../../services'
import { useQuery } from '@tanstack/react-query'
const MuiDataTable = () => {

  const usersData = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5000
  })


  const mData = usersData.data?.data ?? [];

  const data = useMemo(() => [...mData], [mData]);

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns =useMemo(
    () => [
    {
      enableHiding: false,
      header: "ID",
      accessorKey: "id",
      visibleInShowHideMenu: false,

    },
    {
      enableClickToCopy: true,
      header: "Name",
      accessorKey: "name",
    },
    {
      enableClickToCopy: true,
      header: "Username",
      accessorKey: "username",
    },
    {
      enableClickToCopy: true,
      header: "User Type",
      accessorKey: "user_type",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Contact No.",
      accessorKey: "contact_no",
    },
    {
      header:"Action",
      accessorKey:"actions",
      showColumnFilters:false,
      enableColumnFilter:false,
      enableColumnOrdering:false,
      enableColumnResizing:true,
      enableSortingRemoval:true,
      size:30,
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => {
              alert("You clicked the button")
            }}
          >
            Edit
          </button>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => {
              alert("You clicked the button")
            }}
          >
            Delete
          </button>
        </div>
      )

    }
  ])

  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableRowSelection: false, //enable some features
    positionPagination:'bottom',

    enableRowPinning: false,
    enableRowSelection: false,

    enableColumnOrdering: false, //enable a feature for all columns
    enableHiding:false,
    enableGlobalFilter: true, //turn off a feature
    enableTopToolbar:true,
    enableFullScreenToggle:false,
    enableColumnSelection:false,
    enableColumnActions:false,
    enableColumnPinning:false,
    enableColumnResizing:false,
    enableColumnVisibility:false,
    enableColumnVirtualization:false,
    enableDensityToggle:false,
    enableEditing:false,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: true,
    columnFilterDisplayMode:"popover",
     initialState: {
      columnVisibility: { id: false },
      showGlobalFilter: true,
     },
     muiSearchTextFieldProps:{
      placeholder: 'Search All Props',
      sx: { minWidth: '18rem' },
      variant: 'outlined',
    },
    muiTableProps: {
      sx: {
        border: '5px solid #ffffff00',
        backgroundColor:'#00ff0000',
        caption: {
          captionSide: 'top',
        },
      },
    },
    muiTablePaperProps:{
      elevation: 1,
      sx: { mb: '1.5rem', borderRadius: '1'   },
    },
     positionGlobalFilter:"right",
     muiTableContainerProps: { sx: { maxHeight: '400px' } },
     muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15],
      variant: 'outlined',
      color:'secondary',
      size:'small',
      showFirstButton:true,
      showLastButton:true,

    },
    paginationDisplayMode:"pages",
    muiTableHeadRowProps:()=>{
      return {
        sx: {
          '&.MuiTableCell-root': {
            borderBottom: '1px solid',
            borderColor: 'divider',
            borderRadius: '0',
            borderBottomLeftRadius: '1',
            borderBottomRightRadius: '1',
            backgroundColor: 'transparent',
          },
        },
      };
    },
    renderTopToolbarCustomActions: (theme) => (
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'transparent',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      ><Typography variant="h5">Users</Typography></Box>
    ),


  });

 // const globalTheme = useTheme(); //(optional) if you already have a theme defined in your app root, you can import here




  if(usersData.isLoading) return <div>Loading..</div>
  if(usersData.isError) return <div>Error..</div>
  return <>
  <MaterialReactTable table={table}
   sx={{
    display: 'flex',
    backgroundColor: 'red',
    gap: '16px',
    padding: '8px',
    flexWrap: 'wrap',
  }}
   enableStickyHeader className=" " />

  </>;
}



export default MuiDataTable
