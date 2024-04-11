import React, { useEffect, useState } from 'react'
import API from '../../../utils/Axios/api';
import UserRegister from '../Register/UserRegister';
import { useParams } from "react-router-dom";
import RegisterProperty from '../Register/RegisterProperty';
import RegisterCategories from '../Register/RegisterCategories';

const UpdateCategories = () => {
    const params = useParams();
    const categoryId = params.categoryId
    const [CategoryData, setCategoryData] = useState([]);
  
    useEffect(() => {
     async function fetchData(){
        try {
            const {success,data,error} = await API.get(`/categories/${categoryId}`);
        
                setCategoryData(data);
                console.log('success')
            
           } catch (error) {
            console.log(error.message)
           }
     }
     fetchData()
      
    }, []);
   console.log(CategoryData)
//    scrollToTop();
    return <RegisterCategories isFromAdmin={true} CategoryData={CategoryData} />;
}

export default UpdateCategories
