import React from 'react'
import HeaderRow from './HeaderRow/HeaderRow'

const TableHeader = ({ columns, sortFunction }) => {

  return (
    <thead className='sticky top-0 bg-[#aab7d2] z-10'>
      <HeaderRow columns={columns} sortFunction={sortFunction} />
    </thead>
  )
}

export default TableHeader
