import React from 'react'
import BodyRowCell from './BodyRowCell/BodyRowCell'

const BodyRow = ({ columns, item, itemIndex, searchKeyword }) => {
    const totalColumns = columns.length;
    const baseWidth = 100 / (totalColumns + 0.5); // 0.5 extra for the first column

    return (
        <tr className='w-full flex'>
            {columns.map((column, index) => {
                var value = column.accessorFn(item)
                return (
                    <BodyRowCell
                        key={index}
                        colIndex={index}
                        rowIndex={itemIndex}
                        value={value}
                        searchKeyword={searchKeyword}
                        style={{ width: `${index === 0 ? baseWidth * 1.5 : baseWidth}%` }}
                    />
                )
            })}
        </tr>
    )
}

export default BodyRow
