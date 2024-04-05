import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchData } from "../../../Redux/Actions/SearchAction";

const HeroSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (destination) => {
    dispatch(setSearchData(destination));
    navigate("/hotels");
  };
  return (
    <>
      <div className="container w-full text-2xl mx-auto  mt-40 mb-10 py-4 ">
        <div className="w-[60vw] mx-auto">
          <div className="text-2xl font-semibold ">Trending destinations</div>
          <p className="text-base ">
            Most popular choices for travellers from India
          </p>
          <div className="flex md:flex-col flex-wrap  ">
            <div className="flex flex-1 md:gap-4 justify-center gap-2 ">
              <div
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40  mx-auto mt-4 h-8 w-[30vw] md:w-[20vw] md:h-20 basis-1/2 cursor-pointer"
                onClick={() => handleClick("goa")}
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1697729435209-97772693b7da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Goa"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-2 text-2xl font-bold text-white  ">
                  Goa
                </h3>
              </div>
              <div
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40  mx-auto mt-4 h-8 w-[30vw] md:w-[20vw] md:h-20 basis-1/2 cursor-pointer "
                onClick={() => handleClick("mumbai")}
              >
                <img
                  src="https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11bWJhaXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Mumbai"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-2 text-2xl font-bold text-white  ">
                  Mumbai
                </h3>
              </div>
            </div>

            <div className="md:flex flex-1 gap-4 justify-center grid grid-cols-2 ">
              <div
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40  mx-auto mt-4 h-8 w-[30vw] md:w-[20vw] md:h-20 cursor-pointer "
                onClick={() => handleClick("jaipur")}
              >
                <img
                  src="https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amFpcHVyfGVufDB8fDB8fHww"
                  alt="jaipur"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-2 text-2xl font-bold text-white  ">
                  Jaipur
                </h3>
              </div>
              <div
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40  mx-auto mt-4 h-8 w-[30vw] md:w-[20vw] md:h-20 cursor-pointer "
                onClick={() => handleClick("shimla")}
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hpbWxhfGVufDB8fDB8fHww"
                  alt="shimla"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-2 text-2xl font-bold text-white  ">
                  Shimla
                </h3>
              </div>
              <div
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40  mx-auto mt-4 h-8 w-[30vw] md:w-[20vw] md:h-20 cursor-pointer "
                onClick={() => handleClick("bangalore")}
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1697729606148-42a74a5bad37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJhbmdhbG9yZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Bangalore"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-2 text-2xl font-bold text-white  ">
                  Bangalore
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
