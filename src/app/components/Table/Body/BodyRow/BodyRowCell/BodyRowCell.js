"use client"
import React, { useMemo, useContext } from 'react'
import { TableContext } from '@/app/page'
import { FaSortUp, FaSortDown } from 'react-icons/fa' // React Icons kütüphanesini kullanıyoruz


const BodyRowCell = ({ column, colIndex, rowIndex, style, item }) => {


    const { sortOrder, sortedColumn, searchKeyword } = useContext(TableContext)

    const value = column.accessorFn(item)
    const type = column.type


    const getBgColor = () => {
        if (rowIndex % 2 === 0 && colIndex % 2 === 0) {
            return 'bg-gray-300'; // En koyu renk
        } else if (rowIndex % 2 === 0 || colIndex % 2 === 0) {
            return 'bg-gray-200'; // Orta ton
        } else {
            return 'bg-gray-100'; // En açık renk
        }
    };

    const highlightText = (text, highlight) => {
        if (type === "date") {
            return text;
        }
        if (!highlight || !highlight.trim()) {
            return <span>{text}</span>;
        }

        const turkishToLower = str => str.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();
        const turkishRegex = highlight.split('').map(char => {
            if (char === 'i') return '[iİ]';
            if (char === 'ı') return '[ıI]';
            return `[${char.toUpperCase()}${char.toLowerCase()}]`;
        }).join('');

        const regex = new RegExp(`(${turkishRegex})`, 'g');
        const parts = text.split(regex);

        return (
            <span>
                {parts.filter(String).map((part, i) =>
                    turkishToLower(part) === turkishToLower(highlight) ?
                        <mark key={i} className="bg-yellow-200">{part}</mark> :
                        <span key={i}>{part}</span>
                )}
            </span>
        );
    };

    const formatDate = (value) => {
        const date = new Date(value)
        return date.toLocaleString("tr-TR", { hour: '2-digit', minute: '2-digit', day: "numeric", month: "long", year: "numeric" })
    }

    const highlightedText = useMemo(() => {
        console.log("highlightText params: ", value, searchKeyword)
        return highlightText(value, searchKeyword);
    }, [value, searchKeyword]);



    const renderSortIcon = () => {
        if (column.header === sortedColumn) {
            return sortOrder === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />
        }
        return null
    }

    return (
        <td className={`h-16 p-2 ${getBgColor()} align-middle`} style={style}>
            <div className='flex items-center justify-center h-full'>
                <p
                    className='text-center line-clamp-2 break-words'
                    title={value}
                >
                    {type == "date" ? formatDate(value) : highlightedText}
                </p>
            </div>
        </td>
    )
}

export default BodyRowCell
