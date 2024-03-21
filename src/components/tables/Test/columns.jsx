import React,{useMemo} from 'react'
import {useReactTable,getCoreRowModel,flexRender} from '@tanstack/react-table'
const columns = () => {
  const data=useMemo(()=>MediaMetadata,[])
  return (
    <div>columns</div>
  )
}

export default columns