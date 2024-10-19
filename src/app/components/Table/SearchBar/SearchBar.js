"use client"
import React, { useContext } from 'react'
import { TableContext } from '@/app/page'

const TableSearchBar = () => {

  const { searchKeyword, setSearchKeyword, className } = useContext(TableContext)

  return (
    <div className={`h-16 flex items-center ${className} my-4`}>
      <div className="relative w-full max-w-[300px]">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-3 pl-10 rounded-full border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out shadow-md"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <img src={"/icons/searchicon.svg"} alt="search" className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
      </div>
    </div>
  )
}

export default TableSearchBar
