import React, { useState, useEffect, useRef } from "react";
import { chevronDown } from "../../assets/img";
import { useOnClickOutside } from "../../utils";

const AmountIn = ({
  value,
  onChange,
  currencyValue,
  onSelect,
  currencies,
  isSwapping,
}) => {
  // 选项表
  const [showList, setShowList] = useState(false);
  // 当前选中的代币
  const [activeCurrency, setActiveCurrency] = useState("Select");
  //
  const ref = useRef();
  // ？
  useOnClickOutside(ref, () => setShowList(false));

  useEffect(() => {
    if (Object.keys(currencies).includes(currencyValue))
      setActiveCurrency(currencies[currencyValue]);
    else setActiveCurrency("Select");
  }, [currencies, currencyValue]);
  return (
    <div className=" flex justify-between items-center flex-row w-full min-w-full bg-site-dim border-[1px] border-transparent hover:border-site-dim2 min-h-[96px] sm:py-8 px-1 rounded-[20px]">
    <input
      placeholder="0"
      value={value}
      disabled={isSwapping}
      onChange={(e) => typeof onChange === "function" && onChange(e.target.value)}
      className="border-[1px] rounded-lg border-[#353949] bg-transparent  w-full flex-1 outline-none font-poppins  text-1xl text-white p-3 fonts"
    />

    <div className="relative" onClick={() => setShowList(!showList)}>
      <button className="flex flex-row items-center bg-site-dim2 py-2 px-4 rounded-xl font-poppins font-bold text-white">
        {activeCurrency}
        <img
          src={chevronDown}
          alt="cheveron-down"
          className={`w-4 h-4 object-contain ml-2 ${
            showList ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {showList && (
        <ul ref={ref} className="absolute z-10 right-0 bg-site-black border-[1px] rounded-lg border-[#353949] border-site-dim2 w-full mt-2 min-w-[170px] overflow-hidden bg-[#13131a]">
          {Object.entries(currencies).map(([token, tokenName], index) => (
            <li
              key={index}
              className={`'font-poppins font-medium text-base text-white hover:text-dim-white px-5 py-3 hover:bg-site-dim2 cursor-pointer' ${
                activeCurrency === tokenName ? "bg-site-dim2" : ""
              } cursor-pointer`}
              onClick={() => {
                if (typeof onSelect === "function") onSelect(token);
                setActiveCurrency(tokenName);
                setShowList(false);
              }}
            >
              {tokenName}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  );
};

export default AmountIn;
