import React, { useEffect, useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { abis } from "../../contracts";
import { erc20ABI, useAccount, useContractWrite } from "wagmi";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import {
  getAvailableTokens,
  getCounterpartTokens,
  findPoolByTokens,
  useTokenBalance,
  useTokenAllowance,
  useContractFunction,
  isOperationPending,
  getSuccessMessage,
  getFailureMessage,
} from "../../utils";
import { ROUTER_ADDRESS } from "../../constants";
import AmountIn from "./AmountIn";
import AmountOut from "./AmountOut";
import Balance from "./Balance";
import styles from "../../assets/styles";
// import AmountOut from "./AmountOut";

const Dex = ({ pools }) => {
  // 当前账号
  const { address } = useAccount();
  // 输入框的值
  const [fromValue, setFromValue] = useState("0");
  // 默认第一个交易对的token0address
  const [fromToken, setFromToken] = useState(pools[0].token0Address); // initialFromToken
  //交换地址
  const [toToken, setToToken] = useState("");
  // 状态更新
  const [resetState, setResetState] = useState(false);
  // 把输入框的值换成bigNumber
  const fromValueBigNumber = parseUnits(fromValue || "0"); // converse the string to bigNumber
  // 获取可用的代币地址
  const availableTokens = getAvailableTokens(pools);

  // 找到to地址
  const counterpartTokens = getCounterpartTokens(pools, fromToken);
  // 找交易对的地址  这个好像是空
  const pairAddress =
    findPoolByTokens(pools, fromToken, toToken)?.address ?? "";

  // 查余额
  const fromTokenBalance = useTokenBalance(fromToken, address);
  const toTokenBalance = useTokenBalance(toToken, address);

  // 查授权余额
  const tokenAllowance =
    useTokenAllowance(fromToken, address, ROUTER_ADDRESS) || parseUnits("0");

  // 是否需要授权
  const approvedNeeded = fromValueBigNumber.gt(tokenAllowance);

  // 输入框的值是否比0大
  const formValueIsGreaterThan0 = fromValueBigNumber.gt(parseUnits("0"));

  // 余额是否够
  const hasEnoughBalance = fromValueBigNumber.lte(
    fromTokenBalance ?? parseUnits("0")
  );

  const [swapApproveState, setSwapApproveState] = useState("nostart");

  // 授权调用对象
  const { writeAsync: swapApproveSend } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: fromToken,
    abi: erc20ABI,
    functionName: "approve",
    args: [ROUTER_ADDRESS, ethers.constants.MaxUint256],
  });
  // 授权
  const onApproveRequested = () => {
    swapApproveSend().then(({ hash, wait }) => {
      setSwapApproveState("pendding");
      wait().then(() => {
        setSwapApproveState("success");
      });
    });
  };

  const [swapExecuteState, setSwapExecuteState] = useState("nostart");
  // 交换调用对象
  const { writeAsync: swapExecuteSend } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: ROUTER_ADDRESS,
    abi: abis.router02,
    functionName: "swapExactTokensForTokens",
    args: [
      fromValueBigNumber,
      0,
      [fromToken, toToken],
      address,
      Math.floor(Date.now() / 1000) + 60 * 20,
    ],
  });
  // 交换
  const onSwapRequested = () => {
    swapExecuteSend().then(({ hash, wait }) => {
      setSwapExecuteState("pendding");
      wait().then((a) => {
        setSwapExecuteState("success");
      });
    });
  };


  // // 是否在授权中
  const isApproving = isOperationPending(swapApproveState);
  // // 是否在交换中
  const isSwapping = isOperationPending(swapExecuteState);
  //是否发起交易
  const [isSend,setIsSend] = useState(false);


  // 可以授权
  const canApprove = !isApproving && approvedNeeded;
  // 可以交换
  const canSwap =
    !approvedNeeded &&
    !isSwapping &&
    formValueIsGreaterThan0 &&
    hasEnoughBalance&&
    !isSend;

  // 获取交易成功信息
  const successMessage = getSuccessMessage(swapApproveState, swapExecuteState);
  const failureMessage = getFailureMessage(swapApproveState, swapExecuteState);

  // 输入修改
  const onFromValueChange = (value) => {
    const trimmedValue = value.trim();

    try {
      trimmedValue && parseUnits(value);
      setFromValue(value);
    } catch (e) {}
  };

  // 代币修改
  const onFromTokenChange = (value) => {
    setFromToken(value);
  };

  const onToTokenChange = (value) => {
    setToToken(value);
  };

  // 根据成功和失败的消息重置兑换
  useEffect(() => {
    if (failureMessage || successMessage) {
      setTimeout(() => {
        setResetState(true);
        setFromValue("0");
        setToToken("");
        setIsSend(false)
      }, 0);
    }
  }, [failureMessage, successMessage]);

  return (
    <div className="flex flex-col w-full items-center bg-[#13131a] border-[1px] rounded-lg border-[#353949] shadow-lg shadow-[#183226] ">
      <div className="mt-[20px] bg-[#1dc071] px-6 py-3 rounded-[10px]">
        LOGO
      </div>
      <div className="w-[95%] bg-[#181B25] mt-[30px] border-[1px] rounded-lg border-[#353949] shadow-lg shadow-[#183226]">
        <AmountIn
          value={fromValue}
          onChange={onFromValueChange}
          currencyValue={fromToken}
          onSelect={onFromTokenChange}
          currencies={availableTokens}
          isSwapping={isSwapping && hasEnoughBalance}
        />
        <Balance tokenBalance={fromTokenBalance} />
      </div>
      <div className="w-[95%] bg-[#181B25] mt-[20px] border-[1px] rounded-lg border-[#353949] shadow-lg shadow-[#183226]">
        <AmountOut
          fromToken={fromToken}
          toToken={toToken}
          amountIn={fromValueBigNumber}
          pairContract={pairAddress}
          currencyValue={toToken}
          onSelect={onToTokenChange}
          currencies={counterpartTokens}
        />
        <Balance tokenBalance={toTokenBalance} />
      </div>
      {approvedNeeded && !isSwapping ? (
        <button
          disabled={!canApprove}
          onClick={onApproveRequested}
          className={`${
            canApprove
              ? "bg-site-pink bg-[#1dc071]"
              : "bg-site-dim2 text-site-dim2  bg-red-500"
          } border-none outline-none px-6 py-2 font-poppins font-bold text-lg rounded-2xl leading-[24px] transition-all min-h-[56px] mt-[30px] `}
        >
          {isApproving ? "Approving..." : "Approve"}
        </button>
      ) : (
        <button
          disabled={!canSwap}
          onClick={onSwapRequested}
          className={`${
            canSwap
              ? "bg-site-pink text-white bg-[#1dc071] "
              : "bg-site-dim2 text-site-dim2 bg-red-500"
          } border-none outline-none px-6 py-2 font-poppins font-bold text-lg rounded-2xl leading-[24px] transition-all min-h-[56px] mt-[30px]`}
        >
          {isSwapping
            ? "Swapping..."
            : hasEnoughBalance
            ? "Swap"
            : "Insufficient balance"}
        </button>
      )}

      {failureMessage && !resetState ? (
        <p className={styles.message}>{failureMessage}</p>
      ) : successMessage ? (
        <p className={styles.message}>{successMessage}</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dex;
