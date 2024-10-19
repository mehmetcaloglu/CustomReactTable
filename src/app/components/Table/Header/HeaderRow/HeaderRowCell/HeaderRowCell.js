"use client"
import React from 'react'
// import HeaderRowCellSortButton from './HeaderRowCellSortButton/HeaderRowCellSortButton'

const HeaderRowCell = ({ value, sortFn, index, style }) => {
    return (
        <th 
            className={`h-[40px] p-1 bg-[#aab7d2] flex items-center justify-center hover:cursor-pointer`} 
            onClick={() => sortFn()}
            style={style}
        >
            <p className="truncate text-center text-white">
                {value}
            </p>
        </th>
    )
}

export default HeaderRowCell
