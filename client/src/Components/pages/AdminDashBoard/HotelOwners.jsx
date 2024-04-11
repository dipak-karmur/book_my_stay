import React, { useEffect, useState } from 'react'
import { DeleteHotelOwner, DeleteUser, getHotelOwners } from '../../../utils/Axios/RequestBuilder';
import TableComponent from '../../Common/TableComponent';
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

const HotelOwners = () => {
    const [hotelOwners,setHotelOwners] = useState([])   
    const navigate = useNavigate();
    
    const HotelOwnersArray = [
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "email", label: "Email" },
        { key: "password", label: "Password" },
      ];

      const handleUpdate = (ownerId) => {

        navigate(`/admin-update-HotelOwners/${ownerId}`);
      };
    
      const handleDelete = async (ownerId) => {
       
        console.log(ownerId);
        try {
            const response = await DeleteHotelOwner(ownerId);
            if (response.success) {
              console.log(response.success)
                const updatedHotelOwners= hotelOwners.filter((owner)=> owner.id !== ownerId );
                setHotelOwners(updatedHotelOwners)
             toast.success('user deleted Successfully!')
            } 
          } catch (error) {
            console.error("Error while deleting HotelOwners", error);
          }
      };
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getHotelOwners();
            if (response.success) {
              setHotelOwners(response.data);
            } else {
              console.error("Failed to fetch the HotelOwners Data", response.error);
            }
          } catch (error) {
            console.error("Error while Fetching HotelOwners", error);
          }
        };
    
        fetchData();
      }, []);
      console.log(hotelOwners)
  return (
    <div>
       {hotelOwners.length > 0 && (
                <TableComponent
                    data={hotelOwners}
                    headers={HotelOwnersArray}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
            )}
    </div>
  )
}

export default HotelOwners
