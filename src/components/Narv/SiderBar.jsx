import React, { useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";

import { logo, sun } from "../../assets/img";
import { navlinks } from "../../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className="flex justify-between items-center flex-col" >
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && "bg-[#2c2f32]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
    <p className="text-[#4C5262] text-xs">{name}</p>
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const path = useLocation();

  const [isActive, setIsActive] = useState(path.pathname.substring(1)===''? 'swap':path.pathname.substring(1));

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} handleClick={() => {
               
                  setIsActive("swap");
            
                
              }} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-9">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
