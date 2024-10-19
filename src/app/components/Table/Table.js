"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react'

import TableHeader from './Header/Header'
import TableSearchBar from './SearchBar/SearchBar'
import TableFilterModal from './FilterModal/FilterModal'
import TableBody from './Body/Body'
import TablePagination from './TablePagination/TablePagination'

import { fetchData } from '@/app/util/api'
import { transformApiData } from '@/app/util/utils'

const Table = ({
    data,
    columns,
    errorMessage,
    pageSize,
    setPageSize,
    totalPages,
    currentPageNumber,
    setCurrentPageNumber,
    searchKeyword,
    setSearchKeyword,
    loading,
}) => {

    const sortFunction = (value) => {
        console.log("sorted clicked: ", value)
    }


    return (
        <div className='flex flex-col h-screen  sm:px-10 w-[100vw] max-w-[1500px] '>
            <TableSearchBar
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                className="h-16"
            />
            <div className='flex-grow overflow-x-auto overflow-y-hidden'>
                <div className='min-w-[1300px] w-full  mx-auto'>
                    <table className='w-full rounded-t-2xl overflow-x-auto'>
                        <TableHeader columns={columns} sortFunction={sortFunction} />
                        <TableBody
                            data={data}
                            columns={columns}
                            errorMessage={errorMessage}
                            searchKeyword={searchKeyword}
                            loading={loading}
                        />
                    </table>
                </div>
            </div>
            <TablePagination
                className="h-16"
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalPages={totalPages}
                currentPageNumber={currentPageNumber}
                setCurrentPageNumber={setCurrentPageNumber}
            />
        </div>
    )
}

export default Table
