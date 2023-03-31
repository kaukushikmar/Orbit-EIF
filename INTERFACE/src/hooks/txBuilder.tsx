import { ethers } from "ethers";
import ABI from "../constants/abi/wallet.json";
import aaveABI from "../constants/abi/aave.json";
import factoryAbi from "../constants/abi/factory.json";
import { useContractFunction } from "@usedapp/core";

const aave = new ethers.utils.Interface(aaveABI);

export const create = async () => {
  const FACTORY_ADDR = "0x0AE1A5865FB2661FF6D452b917ed94E44979424c";

  const Factory = new ethers.Contract(FACTORY_ADDR, factoryAbi.abi);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, send } = useContractFunction(Factory, "create", {});
  return { state, send };
};

const supply = async (wallet: string) => {
  const Wallet = new ethers.Contract(wallet, ABI);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, send } = useContractFunction(Wallet, "supplyToWallet", {});
  return { state, send };
};

const supplyToPool = async (wallet: string) => {
  const Wallet = new ethers.Contract(wallet, ABI);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, send } = useContractFunction(
    Wallet,
    "supplyToLiquidityPool",
    {}
  );
  return { state, send };
};

const withdrawFromPool = async (wallet: string) => {
  const Wallet = new ethers.Contract(wallet, ABI);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, send } = useContractFunction(
    Wallet,
    "withdrawFromLiquidityPool",
    {}
  );
  return { state, send };
};

const borrow = async (wallet: string) => {
  const Wallet = new ethers.Contract(wallet, ABI);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, send } = useContractFunction(Wallet, "borrowToWallet", {});
  return { state, send };
};

const payback = async (wallet: string) => {
  const Wallet = new ethers.Contract(wallet, ABI);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, send } = useContractFunction(Wallet, "payback", {});
  return { state, send };
};

const aSupply = async (wallet: string, token: string, amount: string) => {
  const Wallet = new ethers.Contract(wallet, ABI);
  //deposit(address token_, uint256 amount_)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, send } = useContractFunction(Wallet, "launchAave", {});
  return {
    state,
    send,
    data: aave.encodeFunctionData("deposit", [token, amount]),
  };
};
