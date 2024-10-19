"use client"
import React, { useEffect, useMemo, useContext } from 'react'
import { TableContext } from '@/app/page'

const TablePagination = ({ className }) => {

    const { totalPages, pageSize, currentPageNumber, setCurrentPageNumber, setPageSize } = useContext(TableContext)

    const pageOptions = useMemo(() => {
        const options = [];
        for (let i = 1; i <= totalPages; i++) {
            options.push(i);
        }
        return options;
    }, [totalPages]);

    useEffect(() => {
        console.log("scroll moruk")
        // page değişince scroll et
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [currentPageNumber, pageSize]);

    return (
        <div className={`h-16 bg-[#aab7d2] shadow-md ${className}`}>
            <div className="h-full flex justify-between items-center px-4">
                {/* ekran büyük iken buton */}
                <button
                    onClick={() => setCurrentPageNumber(currentPageNumber - 1)}
                    disabled={currentPageNumber === 1}
                    className="hidden sm:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Before
                </button>
                <button
                    onClick={() => setCurrentPageNumber(currentPageNumber + 1)}
                    disabled={currentPageNumber >= totalPages}
                    className="hidden sm:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    After
                </button>
                <span className="text-lg font-semibold hidden sm:block">
                    Page {currentPageNumber} / {totalPages || "?"}
                </span>


                {/* küçükse select */}
                <select
                    value={currentPageNumber}
                    onChange={(e) => setCurrentPageNumber(Number(e.target.value))}
                    className="sm:hidden bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {pageOptions.map((page) => (
                        <option key={page} value={page}>
                            Page: {page}
                        </option>
                    ))}
                </select>

                {/* page size select */}
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="ml-4 bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                </select>
            </div>
        </div>
    )
}

export default TablePagination
