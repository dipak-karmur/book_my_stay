import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import API from "../../utils/Axios/api";
import ReactStars from "react-rating-stars-component";
import Modal from "../Common/Modal";

const HotelViewDetails = ({cancelAction,deleteAction}) => {
  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem("hotelDetails");
      return savedData ? JSON.parse(savedData) : {};
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  });
  const [modalOn,setModalOn] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const hotelId = params.hotelId;

  useEffect(() => {
    const getHotelDetails = async () => {
      const response = await API.get(`/hotels/${hotelId}`);
      setData(response.data);
    };
    getHotelDetails();
    localStorage.setItem("hotelDetails", JSON.stringify(data));
  }, []);
  console.log(data);

  const beforeDiscount =
    data.Price + (data.Price * data.discountPercentage) / 100;

  function handleNavigate() {
    navigate("/userdetails", { state: data });
  }
  
  function handleModal(){
    setModalOn(true);
  }

  return (
    <>
      <div className="">
        <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center p-8">
              {/* <div className="mx-auto w-full"> */}
              <img
                src={data.Thumbnail}
                alt="hotel"
                className="w-4/5 rounded object-cover mx-auto"
              />
              {/* </div> */}

              <hr className="border-white border-2 my-6" />
              <div className="flex flex-wrap gap-x-12 gap-y-6 justify-center mx-auto">
                {data.Images.map((image) => {
                  return (
                    <img
                      src={image}
                      alt="Hotel"
                      className="h-[200px] w-[200px] rounded object-cover"
                    />
                  );
                })}
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-gray-800">
                {data.title} | {data.Location}
              </h2>
              <h4 className="text-md font-semibold text-gray-600">
                {data.City}
              </h4>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-gray-800 text-xl font-bold">${data.Price}</p>
                <p className="text-gray-400 text-xl">
                  <strike>${beforeDiscount}</strike>{" "}
                  <span className="text-sm ml-1">Tax included</span>
                </p>
              </div>
              <div className="flex items-center">
                <ReactStars
                  count={5}
                  value={data.Rating}
                  a11y={false}
                  isHalf={true}
                  edit={false}
                  size={24}
                  color={`rgb(156 163 175)`}
                  activeColor={`#ffd700`}
                />
                <p className="text-gray-600 font-bold text-sm ml-1">
                  {data.Rating}
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800">
                  About the Hotel
                </h3>
                <p className="md:text-lg text-gray-500 text-base  ">
                  {data.Description}
                </p>
                <h2 className="text-md font-bold text-gray-800 mt-4">
                  Most popular facilities
                </h2>
                <ul className="space-y-3 list-disc mt-4 pl-4 text-base md:text-md text-gray-500 ">
                  {data.Amenities.map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </div>
              <div className="mt-8 max-w-md">
               
                 {/* {
                  modalOn ? <Modal cancelAction={cancelAction} deleteAction={deleteAction}/> : null
                 }
                <button
                  className="mt-2 px-2 py-1.5 md:px-3 md:py-2 rounded-md bg-[#0071c2] text-white  hover:bg-sky-800 flex items-center gap-0.5"
                  onClick={handleModal}
                >
                  Add Review
                </button> */}
                <button
                  className="mt-2 px-2 py-1.5 md:px-3 md:py-2 rounded-md bg-[#0071c2] text-white  hover:bg-sky-800 flex items-center gap-0.5"
                  onClick={handleNavigate}
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelViewDetails;
