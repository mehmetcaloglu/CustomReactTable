import React from 'react'
import HeaderRowCell from './HeaderRowCell/HeaderRowCell'

const HeaderRow = ({ columns, sortFunction }) => {
    const sortFn = (value) => {
        sortFunction(value)
    }

    const totalColumns = columns.length;
    const baseWidth = 100 / (totalColumns + 0.5); // 0.5 extra for the first column

    return (
        <tr className='flex rounded-t-2xl w-full'>
            {columns.map((column, index) => (
                <HeaderRowCell 
                    key={index} 
                    index={index} 
                    value={column.header} 
                    sortFn={() => sortFn(column.header)}
                    style={{ width: `${index === 0 ? baseWidth * 1.5 : baseWidth}%` }}
                />
            ))}
        </tr>
    )
}

export default HeaderRow
