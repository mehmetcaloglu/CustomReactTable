
export async function transformApiData(apiResponse) {

    var model = {
        data: apiResponse._embedded.events.map(event => ({
            EventName: event.name,
            SalesStartTime: event.sales.public.startDateTime,
            SalesEndTime: event.sales.public.endDateTime,
            EventStartTime: event.dates.start.dateTime,
            IsOnSale: event.dates.status.code === 'onsale',
            Class: event.classifications[0].segment.name,
            Type: event.classifications[0].genre.name,
            Location: event._embedded.venues[0].name,
            CityName: event._embedded.venues[0].city.name,
        })),
        page: apiResponse.page
    }

    return model;

}

// not using for now
