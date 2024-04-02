import React, { useEffect, useState } from 'react'
import API from './api'
import { useDispatch } from 'react-redux';
import { add } from '../Redux/Actions/Actions';

const FetchData = () => {
    const [stateData,setData] = useState([]);
    const dispatch  = useDispatch();

    

   const fetchData = async () => {

    const {data} = await API.get("/");
    console.log(data);
    setData(() => data)

    
   
    // const newData = await API.post("/",{id:11,name:'sgs',age:20,phone:'5647873'})
    // console.log(newData);
    
    // const gt = await API.get("/");
    // console.log(gt.data);

    
    dispatch(add(data));

   }


  return (
    <div>
      <button onClick={fetchData}>getData</button>
    </div>
  )
}

export default FetchData
