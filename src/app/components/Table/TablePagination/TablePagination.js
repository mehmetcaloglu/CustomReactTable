import React from 'react'

const TablePagination = ({ pageSize, setPageSize, currentPageNumber, setCurrentPageNumber, totalPages, className }) => {
    return (
        <div className={`h-16 bg-[#aab7d2] shadow-md ${className}  `}>
            <div className="h-full flex justify-between items-center  ">
                <button
                    onClick={() => setCurrentPageNumber(currentPageNumber - 1)}
                    disabled={currentPageNumber == 0}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">
                    Page {currentPageNumber} of {totalPages || "?"}
                </span>
                <button
                    onClick={() => setCurrentPageNumber(currentPageNumber + 1)}
                    disabled={currentPageNumber == totalPages - 1}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="lg:ml-4 bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
