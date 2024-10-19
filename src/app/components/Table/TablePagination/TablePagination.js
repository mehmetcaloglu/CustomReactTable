"use client"
import React, { useEffect } from 'react'

const TablePagination = ({ pageSize, setPageSize, currentPageNumber, setCurrentPageNumber, totalPages, className }) => {

    const pageOptions = (totalPages) => {
        const options = [];
        for (let i = 1; i <= totalPages; i++) {
            options.push(i);
        }
        return options;
    };

    useEffect(() => {
        console.log("scroll moruk")
        // page değişince scroll et
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [currentPageNumber]);

    return (
        <div className={`h-16 bg-[#aab7d2] shadow-md ${className}`}>
            <div className="h-full flex justify-between items-center px-4">
                {/* ekran büyük iken buton */}
                <button
                    onClick={() => setCurrentPageNumber(currentPageNumber - 1)}
                    disabled={currentPageNumber === 1}
                    className="hidden sm:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Önceki
                </button>
                <span className="text-lg font-semibold hidden sm:block">
                    Sayfa {currentPageNumber} / {totalPages || "?"}
                </span>
                <button
                    onClick={() => setCurrentPageNumber(currentPageNumber + 1)}
                    disabled={currentPageNumber === totalPages}
                    className="hidden sm:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Sonraki
                </button>

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
