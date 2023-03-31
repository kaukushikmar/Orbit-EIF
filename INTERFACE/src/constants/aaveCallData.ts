import { ethers } from "ethers";

export function aaveInteractor(functionToCall, token, amount) {
  let ABI = [`function ${functionToCall}(address, uint256)`];
  let iface = new ethers.utils.Interface(ABI);
  const data = iface.encodeFunctionData(`${functionToCall}`, [token, amount]);
  return data;
}
