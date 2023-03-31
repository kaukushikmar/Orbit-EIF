import { ethers, providers, Signer } from "ethers";
import axios from "axios";

const NEXT_PUBLIC_TENDERLY_USER = process.env.NEXT_PUBLIC_TENDERLY_USER;
const NEXT_PUBLIC_TENDERLY_PROJECT = process.env.NEXT_PUBLIC_TENDERLY_PROJECT;
const NEXT_PUBLIC_TENDERLY_ACCESS_KEY =
  process.env.NEXT_PUBLIC_TENDERLY_ACCESS_KEY;

export const simulateTransaction = async (
  senderAddr: string,
  contract: any,
  funcName: string,
  ...args: any[]
) => {
  const unsignedTx = await contract.populateTransaction[funcName](...args);
  const TENDERLY_FORK_API = `https://api.tenderly.co/api/v1/account/${NEXT_PUBLIC_TENDERLY_USER}/project/${NEXT_PUBLIC_TENDERLY_PROJECT}/fork`;
  const body = {
    network_id: "5",
    block_number: null,
  };
  const headers = {
    headers: {
      "X-Access-Key": NEXT_PUBLIC_TENDERLY_ACCESS_KEY as string,
    },
  };
  const resp = await axios.post(TENDERLY_FORK_API, body, headers);
  const forkId = resp.data.simulation_fork.id;
  const forkRPC = `https://rpc.tenderly.co/fork/${forkId}`;
  const provider = new ethers.providers.JsonRpcProvider(forkRPC);
  const transactionParameters = [
    {
      to: contract.address,
      from: senderAddr,
      data: unsignedTx.data,
      gas: ethers.utils.hexValue(3000000),
      gasPrice: ethers.utils.hexValue(1),
      value: ethers.utils.hexValue(0),
    },
  ];
  const txHash = await provider.send(
    "eth_sendTransaction",
    transactionParameters
  );
  const txReceipt = await provider.send("eth_getTransactionReceipt", [txHash]);
  const TENDERLY_FORK_ACCESS_URL = `https://api.tenderly.co/api/v1/account/${NEXT_PUBLIC_TENDERLY_USER}/project/${NEXT_PUBLIC_TENDERLY_PROJECT}/fork/${forkId}`;

  await axios.delete(TENDERLY_FORK_ACCESS_URL, headers);
  //   console.log(
  //     "🚀 ~ file: tenderly.ts:59 ~ txReceipt.status.toString()",
  //     txReceipt.status.toString()
  //   );

  return txReceipt.status.toString();
};
