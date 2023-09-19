import { Contract } from "@ethersproject/contracts";
import { abis } from "../contracts";
import { useContractReads } from "wagmi";
import { parseUnits } from "ethers/lib/utils";
import { useEffect } from "react";
import { erc20ABI, useContractRead, useAccount } from "wagmi";
import { GFNFT_ADDRESS, ROUTER_ADDRESS } from "../constants";

export const getAvailableTokens = (pools) =>
  pools.reduce((prev, curr) => {
    prev[curr.token0Address] = curr.token0Name;
    prev[curr.token1Address] = curr.token1Name;
    return prev;
  }, {});

export const getCounterpartTokens = (pools, fromToken) =>
  pools
    .filter((cur) => cur.token0Address === fromToken || cur.token1Address)
    .reduce((prev, curr) => {
      if (curr.token0Address === fromToken) {
        prev[curr.token1Address] = curr.token1Name;
      } else if (curr.token1Address === fromToken) {
        prev[curr.token0Address] = curr.token0Name;
      }
      return prev;
    }, {});

export const findPoolByTokens = (pools, fromToken, toToken) => {
  if (!Array.isArray(pools) || !fromToken || !toToken) return undefined;

  return pools.find(
    (cur) =>
      (cur.token0Address === fromToken && cur.token1Address === toToken) ||
      (cur.token1Address === fromToken && cur.token0Address === toToken)
  );
};

export const isOperationPending = (operationState) =>
  operationState === "pendding"

export const isOperationFailed = (operationState) =>
  operationState.status === "Fail" || operationState.status === "Exception";
export const isOperationSucceeded = (operationState) =>
  operationState === "success";

export const getFailureMessage = (swapApproveState, swapExecuteState) => {
  if (
    isOperationPending(swapApproveState) ||
    isOperationPending(swapExecuteState)
  ) {
    return undefined;
  }

  if (isOperationFailed(swapApproveState)) {
    return "Approval failed - " + swapApproveState.errorMessage;
  }

  if (isOperationFailed(swapExecuteState)) {
    return "Swap failed - " + swapExecuteState.errorMessage;
  }

  return undefined;
};

export const getSuccessMessage = (swapApproveState, swapExecuteState,state) => {
  if (
    isOperationPending(swapExecuteState) ||
    isOperationPending(swapApproveState)||isOperationPending(state)
  ) {
    return undefined;
  }

  if (isOperationSucceeded(swapExecuteState)) {
    return "Swap executed successfully";
  }

  if (isOperationSucceeded(swapApproveState)) {
    return "Approval successful";
  }
  if (isOperationSucceeded(state)) {
    return "Approval successful";
  }

  return undefined;
};

export const useAmountsOut = (pairAddress, amountIn, fromToken, toToken) => {
  const isValidAmountIn = amountIn.gt(parseUnits("0"));
  const areParamsValid = !!(
    pairAddress &&
    isValidAmountIn &&
    fromToken &&
    toToken
  );

  const { error, data } =useContractRead(areParamsValid && {
      address: ROUTER_ADDRESS,
      abi: abis.router02,
      functionName: "getAmountsOut",
      args: [amountIn, [fromToken, toToken]],
    })?? {};

    return error ? parseUnits("0") : data;
  }
  


export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export function useTokenBalance(caddress, address) {
  const { data, isError, isLoading } = useContractRead({
    address: caddress,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [address],
  });
  return data;
}

export function useTokenAllowance(caddress, address, to) {
  const { data, isError, isLoading } = useContractRead({
    address: caddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address, to],
  });
  return data;
}

export function useContractFunction(caddress, address, to) {
  const { data, isError, isLoading } = useContractRead({
    address: caddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address, to],
  });
  return data;
}

export function useRole(address) {
  const { data, isError, isLoading } = useContractRead({
    address: GFNFT_ADDRESS,
    abi: abis.gfnft,
    functionName: "hasRole",
    args: ['0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', address],
  });
  return data;
}

export function useAlreadyMint(address) {
  const { data, isError, isLoading } = useContractRead({
    address: GFNFT_ADDRESS,
    abi: abis.gfnft,
    functionName: "isMinted",
    args: [address],
  });
  return data;
}

export function useNFTBalance(address) {
  const { data, isError, isLoading } = useContractRead({
    address: GFNFT_ADDRESS,
    abi: abis.gfnft,
    functionName: "balanceOf",
    args: [address],
  });
  return data;
}

export function useIsPledge(address) {
  const { data, isError, isLoading } = useContractRead({
    address: GFNFT_ADDRESS,
    abi: abis.gfnft,
    functionName: "isPledge",
    args: [address],
  });
  return data;
}
export function useIsWithdraw(address) {
  const { data, isError, isLoading } = useContractRead({
    address: GFNFT_ADDRESS,
    abi: abis.gfnft,
    functionName: "isWithdraw",
    args: [address],
  });
  return data;
}

export function usePledgeTime(address) {
  const { data, isError, isLoading } = useContractRead({
    address: GFNFT_ADDRESS,
    abi: abis.gfnft,
    functionName: "pledgeTime",
    args: [address],
  });
  return data;
}