"use client"
import React, { useMemo } from 'react'

const BodyRowCell = ({ value, searchKeyword, colIndex, rowIndex, style }) => {

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
        if (!highlight.trim()) {
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

    const highlightedText = useMemo(() => {
        return highlightText(value, searchKeyword);
    }, [value, searchKeyword]);

    return (
        <td className={`h-16 p-2 ${getBgColor()} align-middle`} style={style}>
            <div className='flex items-center justify-center h-full'>
                <p
                    className='text-center line-clamp-2 break-words'
                    title={value}
                >
                    {highlightedText}
                </p>
            </div>
        </td>
    )
}

export default BodyRowCell
