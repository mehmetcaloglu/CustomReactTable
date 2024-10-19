"use client"
import Image from "next/image";
import Table from "./components/Table/Table";
import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchData } from './util/api'


export default function TablePage() {

  const [searchKeyword, setSearchKeyword] = useState('')
  const [data, setData] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [pageSize, setPageSize] = useState(50)
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const timeoutRef = useRef(null)

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

  return (
    <div className="relative h-screen">
      <Table
        columns={
          [
            {
              "header": "Event Name",
              "accessorFn": (item) => item.name
            },
            {
              "header": "Sales Start Time",
              "accessorFn": (item) => {
                var date = new Date(item.sales.public.startDateTime)
                return date.toLocaleString("tr-TR", { hour: '2-digit', minute: '2-digit', day: "numeric", month: "long", year: "numeric" })
              }
            },
            {
              "header": "Sales End Time",
              "accessorFn": (item) => {
                var date = new Date(item.sales.public.endDateTime)
                return date.toLocaleString("tr-TR", { hour: '2-digit', minute: '2-digit', day: "numeric", month: "long", year: "numeric" })
              }
            },
            {
              "header": "Event Start Time",
              "accessorFn": (item) => {
                var date = new Date(item.dates.start.dateTime)
                return date.toLocaleString("tr-TR", { hour: '2-digit', minute: '2-digit', day: "numeric", month: "long", year: "numeric" })
              }
            },
            {
              "header": "Is On Sale",
              "accessorFn": (item) => item.dates.status.code
            },
            {
              "header": "Class",
              "accessorFn": (item) => item.classifications[0].segment.name
            },
            {
              "header": "Type",
              "accessorFn": (item) => item.classifications[0]?.genre?.name || "none"
            },
            {
              "header": "Location",
              "accessorFn": (item) => item._embedded.venues[0].name
            },
            {
              "header": "City Name",
              "accessorFn": (item) => item._embedded.venues[0].city.name
            }
          ]
        }


        data={data}
        errorMessage={errorMessage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
        currentPageNumber={currentPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        loading={loading}
      />
    </div>
  );
}
