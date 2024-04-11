import React, { useEffect, useState } from 'react'
import { DeleteUser, getUsers } from '../../../utils/Axios/RequestBuilder';
import TableComponent from '../../Common/TableComponent';
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

const Users = () => {
    const [users,setUsers] = useState([])   
    const navigate = useNavigate();
    
    const usersArray = [
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "email", label: "Email" },
        { key: "password", label: "Password" },
      ];

      const handleUpdate = (userId) => {

        navigate(`/admin-update-users/${userId}`);
      };
    
      const handleDelete = async (userId) => {
       
        console.log(userId);
        try {
            const response = await DeleteUser(userId);
            if (response.success) {
                const updatedUsers= users.filter((user)=> user.id !== userId );
                setUsers(updatedUsers)
             toast.success('user deleted Successfully!')
            } 
          } catch (error) {
            console.error("Error while deleting users", error);
          }
      };
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getUsers();
            if (response.success) {
              setUsers(response.data);
            } else {
              console.error("Failed to fetch the users Data", response.error);
            }
          } catch (error) {
            console.error("Error while Fetching users", error);
          }
        };
    
        fetchData();
      }, []);
      console.log(users)
  return (
    <div>
       {users.length > 0 && (
                <TableComponent
                    data={users}
                    headers={usersArray}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
            )}
    </div>
  )
}

export default Users
