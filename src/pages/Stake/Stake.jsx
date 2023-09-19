import React from "react";

import NFTStake from "./NFTStake";

const Stake = () => {
  return (
    <div className="flex flex-wrap">
      <div className="basis-full bg-[#13131a] border-[1px] rounded-lg border-[#353949] p-5">
        <div className="text-3xl">SHARE AND STAKE</div>
          <NFTStake />
      </div>

      <div className="basis-full mt-10 bg-[#13131a] border-[1px] rounded-lg border-[#353949] h-[500px] p-5">
        <div className="text-3xl">GF Stake</div>
      </div>
    </div>
  );
};



export default Stake;
