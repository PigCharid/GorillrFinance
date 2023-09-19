import React, { useState, useEffect } from "react";
import { Chart } from "../../components/Chart";
import { Dex } from "../../components/Dex";
import { pools } from "../../constants";


const Swap = () => {

  return (
    <div className="text-white  flex flex-wrap lg:flex-nowrap">
      <div className="lg:basis-[950px] sm:basis-full w-full lg:mr-5 shadow-lg shadow-[#183226]">
        <Chart />
      </div>
      <div className="lg:basis-[400px] lg:shrink-0 sm:basis-full flex justify-center w-full sm:mt-[20px] lg:mt-0">
        <Dex pools={pools}/>
      </div>
    </div>      
  );
};

export default Swap;
