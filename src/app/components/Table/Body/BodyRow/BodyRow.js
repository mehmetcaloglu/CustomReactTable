import React from 'react'
import BodyRowCell from './BodyRowCell/BodyRowCell'
import { useContext } from 'react'
import { TableContext } from '@/app/page'

const BodyRow = ({ item, itemIndex }) => {
    const { columns } = useContext(TableContext)
    const totalColumns = columns.length;
    const baseWidth = 100 / (totalColumns + 0.5); // 0.5 extra for the first column

    return (
        <tr className='w-full flex'>
            {columns.map((column, index) => {
                var value = column.accessorFn(item)
                var type = column.type
                return (
                    <BodyRowCell
                        key={index}
                        colIndex={index}
                        rowIndex={itemIndex}
                        item={item}
                        column={column}
                        style={{ width: `${index === 0 ? baseWidth * 1.5 : baseWidth}%` }}
                    />
                )
            })}
        </tr>
    )
}

export default BodyRow
