"use client"
import Image from "next/image";
import Table from "./components/Table/Table";
import { useState, useEffect, useCallback, useRef, createContext } from 'react'
import { fetchData } from './util/api'

export const TableContext = createContext()
export default function TablePage() {

  const [searchKeyword, setSearchKeyword] = useState('')
  const [data, setData] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [pageSize, setPageSize] = useState(10)
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const timeoutRef = useRef(null)
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);

  const immediateSearch = useCallback((keyword) => {
    setLoading(true);
    fetchData({ keyword, pageSize, currentPageNumber }).then(data => {
      if (data) {
        setErrorMessage(null);
        setData(data._embedded.events);
        setTotalPages(data.page.totalPages);
      } else {
        setData([]);
        setTotalPages(0);
        setErrorMessage("No event found. Please search something else.");
      }
      setLoading(false);
    }).catch(error => {
      setErrorMessage(error.response.data);
      setLoading(false);
    });
  }, [pageSize, currentPageNumber]);

  const debouncedSearch = useCallback(
    (keyword) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        immediateSearch(keyword);
      }, 600);
    },
    [immediateSearch]
  );

  useEffect(() => {
    if (searchKeyword !== "") {
      immediateSearch(searchKeyword);
    }
  }, [pageSize, currentPageNumber, immediateSearch]);

  useEffect(() => {
    if (searchKeyword !== "") {
      debouncedSearch(searchKeyword);
    }
  }, [searchKeyword, debouncedSearch]);

  var columns = [
    {
      "header": "Event Name",
      "accessorFn": (item) => item.name,
      "type": "string"
    },
    {
      "header": "Sales Start Time",
      "accessorFn": (item) => item.sales.public.startDateTime,
      "type": "date"
    },
    {
      "header": "Sales End Time",
      "accessorFn": (item) => {
        return item.sales.public.endDateTime
      },
      "type": "date"
    },
    {
      "header": "Event Start Time",
      "accessorFn": (item) => {
        return item.dates.start.dateTime
      },
      "type": "date"
    },
    {
      "header": "Is On Sale",
      "accessorFn": (item) => item.dates.status.code,
      "type": "string"
    },
    {
      "header": "Class",
      "accessorFn": (item) => item.classifications[0].segment.name,
      "type": "string"
    },
    {
      "header": "Type",
      "accessorFn": (item) => item.classifications[0]?.genre?.name || "none",
      "type": "string"
    },
    {
      "header": "Location",
      "accessorFn": (item) => item._embedded.venues[0].name,
      "type": "string"
    },
    {
      "header": "City Name",
      "accessorFn": (item) => item._embedded.venues[0].city.name,
      "type": "string"
    }
  ]

  const sortFunction = (value) => {
    console.log("sortFunction: ", value);
    const column = columns.find(column => column.header === value);

    let newSortOrder = 'asc';
    if (sortedColumn === value) {
      // Aynı sütuna tıklandığında sıralama yönünü değiştir
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }

    const sortedData = [...data].sort((a, b) => {
      const valueA = column.accessorFn(a);
      const valueB = column.accessorFn(b);

      if (column.type === "string") {
        return newSortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (column.type === "date") {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return newSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }

    });

    setData(sortedData);
    setSortedColumn(value);
    setSortOrder(newSortOrder);
  };

  return (
    <TableContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        data,
        setData,
        errorMessage,
        setErrorMessage,
        pageSize,
        setPageSize,
        currentPageNumber,
        setCurrentPageNumber,
        totalPages,
        setTotalPages,
        loading,
        setLoading,
        sortFunction,
        columns,
        sortOrder,
        sortedColumn
      }}>
      <div className="relative h-screen">
        <Table />
      </div>
    </TableContext.Provider>
  );
}
