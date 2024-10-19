import React from 'react'
import BodyRow from './BodyRow/BodyRow'

const TableBody = ({ data, columns, searchKeyword, loading, errorMessage }) => {
  return (
    <tbody className='block w-full h-[calc(100vh-8rem)] overflow-y-auto'>      {
      !loading ?
        errorMessage ?
          <tr><td colSpan="100%" className="text-center text-2xl py-4">{errorMessage}</td></tr>
          :
          data.length == 0 ?
            <tr><td colSpan="100%" className="text-center text-2xl py-4">Verilerin gelmesi için birşeyler yazın.</td></tr>
            :
            <>
              {data.map((item, index) => (
                <BodyRow key={index} itemIndex={index} columns={columns} item={item} searchKeyword={searchKeyword} />
              ))}
              <tr className='h-20'></tr>
            </>
        : <tr><td colSpan="100%" className="text-center text-2xl py-4">Loading...</td></tr>
    }
    </tbody>
  )
}

export default TableBody
