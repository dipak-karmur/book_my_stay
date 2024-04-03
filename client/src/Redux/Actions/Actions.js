export const SET_LOADER = 'SET_LOADER'
export const add = (data ) =>{

    return(
        {
            type:'ADD',
            payload:data
        }
    )
}

export const setLoader = (data) =>{
    return(
        {
            type:SET_LOADER,
            payload:data
        }
    )
}