import React from "react";
import ButtonComponent from "./ButtonComponent";
import { FaRegPlusSquare } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'


const TableComponent = ({ data, headers, handleUpdate, handleDelete }) => {
  const navigate = useNavigate()
    console.log(data);

    function handleNavigate(){
        navigate('/admin-create-category')
    }

  return (
    <div className="overflow-x-auto">
         <h2 className="text-2xl font-bold text-center mt-8">Welcome to Admin DashBoard</h2>
         <ButtonComponent className='absolute right-2' onClick={handleNavigate}>Add Category <FaRegPlusSquare size={20}/> </ButtonComponent>
      <table className="w-full border-collapse mt-24 mx-10">
     
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">No.</th>
            {headers.map((header) => (
              <th key={header.key} className="border px-4 py-2 text-left">
                {header.label}
              </th>
            ))}
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border px-4 py-2">{index + 1}</td>
              {headers.map((header) => (
                <td key={header.key} className="border px-4 py-2 ">
                  {item[header.key]}
                </td>
              ))}
              <td className="border px-4 py-2 flex justify-center items-center gap-2">
                <ButtonComponent
                  onClick={() => handleUpdate(item.id)}
                  buttonStyle="px-[8px] py-[4px] text-sm mt-[0px!important]"
                >
                  Update
                </ButtonComponent>
                <ButtonComponent
                  variant='danger'
                  onClick={() => handleDelete(item.id)}
                  buttonStyle="px-[8px] py-[4px] text-sm bg-[#c53030] border-[#c53030] mt-[0px!important] hover:text-[#c53030]"
                >
                  Delete
                </ButtonComponent>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
