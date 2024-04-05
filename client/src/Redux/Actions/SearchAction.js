export const SET_SEARCH_DATA = "SET_SEARCH_DATA";

export const setSearchData = (destination,date,options) => {
    return {
        type: SET_SEARCH_DATA,
        payload: {
            destination,date,options
        }
    }
}
