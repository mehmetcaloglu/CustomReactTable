

// https://app.ticketmaster.com/discovery/v2/events.json?keyword=mehmet&countryCode=TR&apikey=AJMGQOsYCIBRnn3A4SCG0wiWyE2Vjqve
// api will be like this. keyword will taken from searchbar, write a function that we will use on the projects


import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const CORS_PROXY = process.env.NEXT_PUBLIC_CORS_PROXY;


export const fetchData = async ({ keyword, countryCode = 'TR', pageSize, currentPageNumber }) => {
    var paramsObject = {
        apikey: API_KEY,
        keyword: keyword,
        countryCode: countryCode,
        size: pageSize,
        page: currentPageNumber
    }
    
    try {
        const response = await axios.get(`${CORS_PROXY}${BASE_URL}`, {
            params: paramsObject
        });

        if (response.data && response.data._embedded && response.data._embedded.events) {
            
            return response.data
        } else {
            return false
        }
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};


