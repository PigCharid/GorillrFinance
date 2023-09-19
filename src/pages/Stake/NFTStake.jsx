import React, { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { parseUnits } from "ethers/lib/utils";
import { nft } from "../../assets/img";
import { GFNFT_ADDRESS } from "../../constants";
import { abis } from "../../contracts";
import {
  useAlreadyMint,
  useRole,
  isOperationPending,
  getSuccessMessage,
  getFailureMessage,
  useIsPledge,
  useNFTBalance,
  useIsWithdraw,
  usePledgeTime,
} from "../../utils";

const NFTStake = () => {
  const [resetState, setResetState] = useState(false);

  // 获取当前账户
  const { address } = useAccount();

  // 是否有mint权限
  const hasRole = useRole(address);
  // 是否已经mint过了
  const alreadyMint = useAlreadyMint(address);

  // NFT的余额
  const NFTBalance = useNFTBalance(address);
  //NFT的余额是否大于0
  const NFTBalanceIsGreaterThan0 = NFTBalance?.gt(parseUnits("0"));
  // 是否已经质押过了
  const isPledge = useIsPledge(address);
  //   是否已经提现
  const isWithdraw = useIsWithdraw(address);
  //   获取质押的时间
  const pledgeTime = usePledgeTime(address);

  // mint的状态
  const [mintState, setMintState] = useState("nostart");
  // pledge的状态
  const [pledgeState, setPledgeState] = useState("nostart");
  // withdraw的状态
  const [withdrawState, setWithdrawState] = useState("nostart");

  // mint调用对象
  const { writeAsync: mintSend } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: GFNFT_ADDRESS,
    abi: abis.gfnft,
    functionName: "mint",
  });
  const onMintRequested = () => {
    mintSend().then(({ hash, wait }) => {
      setMintState("pendding");
      wait().then(() => {
        
        setMintState("success");
        
      });
    });
  };
  // pledge调用对象
  const { writeAsync: pledgeSend } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: GFNFT_ADDRESS,
    abi: abis.gfnft,
    functionName: "pledge",
  });
  // pledge
  const onPledgeRequested = () => {
    pledgeSend().then(({ hash, wait }) => {
      setPledgeState("pendding");
      wait().then(() => {
        setPledgeState("success");
      });
    });
  };

  // withdraw调用对象
  const { writeAsync: withdrawSend } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: GFNFT_ADDRESS,
    abi: abis.gfnft,
    functionName: "withdraw",
  });
  // pledge
  const onWithDrawRequested = () => {
    withdrawSend().then(({ hash, wait }) => {
      setWithdrawState("pendding");
      wait().then(() => {
        setWithdrawState("success");
      });
    });
  };

  // 是否正在pledge
  const isPledgeing = isOperationPending(pledgeState);
  //   是否正在Withdraw
  const isWithdrawing = isOperationPending(withdrawState);
  // 是否正在mint
  const isMinting = isOperationPending(mintState);

  // 可以mint
  const canMint = !isMinting && hasRole && !alreadyMint;
  // 可以质押
  const canPledge = NFTBalanceIsGreaterThan0 && !isPledge && !isPledgeing;
  //   可以提现
  const canWithdraw = isPledge && !isWithdraw && !isWithdrawing;

  // 获取交易成功信息
  const successMessage = getSuccessMessage(
    mintState,
    pledgeState,
    withdrawState
  );

  // 根据成功和失败的消息重置兑换
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        resetState(true);
      }, 500);
    }
  }, [successMessage]);

  return (
    <div className="flex flex-wrap mt-2 justify-around">
      <div className="basis-full md:basis-[45%] p-2">
        <div className="w-full  shadow-lg shadow-[#183226] rounded-lg overflow-hidden bg-[#181B25] my-2 p-3">
          <img
            src={nft}
            alt="NFT"
            className="h-60 w-full object-cover shadow-lg shadow-[#183226] rounded-lg mb-3"
          />
          <div className=" font-semibold ">
            如果您帮助项目进行推广，您就可以获取NFT奖励
          </div>

          <div className="flex justify-between items-center mt-3 text-white">
            <div className="flex flex-col"></div>

            <button
              disabled={!canMint}
              onClick={onMintRequested}
              className={`${canMint ? "bg-[#4acd8d]" : "bg-red-500"} 
            shadow-lg shadow-[#183226] text-xlhover:bg-[#25ff95] cursor-pointer rounded-lg px-5 py-1 border-[1px]  border-[#353949]`}
            >
              {hasRole
                ? !alreadyMint
                  ? isMinting
                    ? "Minting"
                    : "Mint"
                  : "Already Mint"
                : "Not MintRole"}
            </button>
          </div>
        </div>
      </div>

      <div className="basis-full md:basis-[45%] mt-2 md:mt-0 p-2 ">
        <div className="w-full  shadow-lg shadow-[#183226] rounded-lg overflow-hidden bg-[#181B25] my-2 p-3">
          <img
            src={nft}
            alt="NFT"
            className="h-60 w-full object-cover shadow-lg shadow-[#183226] rounded-lg mb-3"
          />
          <div className="font-semibold">
            {NFTBalanceIsGreaterThan0
              ? isPledge
                ? !isWithdraw
                  ? "这里根据时间判断"
                  : "您已经获取了GF奖励"
                : "您可质押NFT来获取GF代币奖励"
              : "请先获取我们的NFT,然后进行质押,然后进行质押"}
          </div>
          <div className="flex justify-between items-center mt-3 text-white">
            <div className="flex flex-col">
              <small className="text-xs">{}</small>
            </div>
            {isPledge ? (
              <button
                disabled={!canWithdraw}
                onClick={onWithDrawRequested}
                className={`${canWithdraw ? "bg-[#4acd8d]" : "bg-red-500"} 
            shadow-lg shadow-[#183226] text-xlhover:bg-[#25ff95] cursor-pointer rounded-lg px-5 py-1 border-[1px]  border-[#353949]`}
              >
                {isWithdrawing ? "Withdrawing" : "Withdraw"}
              </button>
            ) : (
              <button
                disabled={!canPledge}
                onClick={onPledgeRequested}
                className={`${canPledge ? "bg-[#4acd8d]" : "bg-red-500"} 
          shadow-lg shadow-[#183226] text-xlhover:bg-[#25ff95] cursor-pointer rounded-lg px-5 py-1 border-[1px]  border-[#353949]`}
              >
                {NFTBalanceIsGreaterThan0?(isPledgeing?"Pledgeing":"Pledge"):"No NFT"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



export default NFTStake;
