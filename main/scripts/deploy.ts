import { ethers } from "hardhat";
import { SignerWithAddress } from "hardhat-deploy-ethers/signers";
import { liquidityPool } from "../typechain/contracts";
import { Contract } from "ethers";

async function main() {
  const [deployer] = await ethers.getSigners();
  // goerli
  const aaveV2LendingPool = "0x4bd5643ac6f66a5237E18bfA7d47cF22f1c9F210";
  const aaveV2FallbackOracle = "0x0F9d5ED72f6691E47abe2f79B890C3C33e924092";
  const aaveV2DataProvider = "0x927F584d4321C1dCcBf5e2902368124b02419a1E";

  const aaveV2FaucetAddr = "0x681860075529352da2C94082Eb66c59dF958e89C";

  const wethAddr = "0xCCa7d1416518D095E729904aAeA087dBA749A4dC";
  const usdcAddr = "0x9FD21bE27A2B059a288229361E2fA632D8D2d074";
  const daiAddr = "0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33";
  const wbtcAddr = "0xf4423F4152966eBb106261740da907662A3569C5";

  const fakeContract = aaveV2LendingPool;

  const amount = ethers.utils.parseUnits("1000000000", "8");

  let proxyAdmin: Contract,
    liquidityPool: Contract,
    oracle: Contract,
    oc: Contract,
    ucWallet: Contract,
    ucFactory: Contract,
    nftManager: Contract;

  let liquidityPoolImplementation: Contract,
    oracleImplementation: Contract,
    ocImplementation: Contract,
    ucFactoryImplementation: Contract,
    nftManagerImplementation: Contract,
    ucWalletImplementation: Contract;

  let aaveInteractor: Contract, faucet: Contract, uiDataProvider: Contract;

  // proxies
  const ProxyAdmin = await ethers.getContractFactory("OrbitProxyAdmin");
  proxyAdmin = await ProxyAdmin.deploy(deployer.address);
  await proxyAdmin.deployed();
  console.log("Proxy Admin deployed at:", proxyAdmin.address);

  const Oracle = await ethers.getContractFactory("Oracle");
  oracle = await Oracle.deploy(fakeContract, proxyAdmin.address, "0x");
  await oracle.deployed();
  console.log("Oracle deployed at:", oracle.address);

  const LiquidityPool = await ethers.getContractFactory("LiquidityPool");
  liquidityPool = await LiquidityPool.deploy(
    fakeContract,
    proxyAdmin.address,
    "0x"
  );
  await liquidityPool.deployed();
  console.log("Liquidity Pool deployed at:", liquidityPool.address);

  const OC = await ethers.getContractFactory("OC");
  oc = await OC.deploy(fakeContract, proxyAdmin.address, "0x");
  await oc.deployed();
  console.log("OC deployed at:", oc.address);

  const UCWallet = await ethers.getContractFactory("UCWallet");
  ucWallet = await UCWallet.deploy(fakeContract, proxyAdmin.address);
  await ucWallet.deployed();
  console.log("UC wallet deployed at:", ucWallet.address);

  const UCFactory = await ethers.getContractFactory("UCFactory");
  ucFactory = await UCFactory.deploy(fakeContract, proxyAdmin.address, "0x");
  await ucFactory.deployed();
  console.log("UC Factory deployed at:", ucFactory.address);

  const NftManager = await ethers.getContractFactory("NftManager");
  nftManager = await NftManager.deploy(fakeContract, proxyAdmin.address, "0x");
  await nftManager.deployed();
  console.log("Nft Manager deployed at:", nftManager.address);

  // faucet
  const Faucet = await ethers.getContractFactory("Faucet");
  faucet = await Faucet.deploy(aaveV2FaucetAddr, wethAddr);
  await faucet.deployed();
  console.log("Faucet deployed at:", faucet.address);

  // implementations and setup
  const OracleImplementation = await ethers.getContractFactory(
    "OracleImplementation"
  );
  oracleImplementation = await OracleImplementation.deploy(
    aaveV2FallbackOracle
  );
  await oracleImplementation.deployed();
  console.log(
    "Oracle implementation deployed at:",
    oracleImplementation.address
  );

  await proxyAdmin.upgrade(oracle.address, oracleImplementation.address);
  console.log("Oracle implementation upgraded!");

  const LiquidityPoolImplementation = await ethers.getContractFactory(
    "LiquidityPoolImplementation"
  );
  liquidityPoolImplementation = await LiquidityPoolImplementation.deploy(
    wethAddr,
    usdcAddr,
    daiAddr,
    wbtcAddr,
    oc.address,
    ucFactory.address
  );
  await liquidityPoolImplementation.deployed();
  console.log(
    "Liquidity Pool implementation deployed at:",
    liquidityPoolImplementation.address
  );

  await proxyAdmin.upgrade(
    liquidityPool.address,
    liquidityPoolImplementation.address
  );
  console.log("Liquidity Pool implementation upgraded!");

  const liquidityPoolProxy = await ethers.getContractAt(
    "LiquidityPoolImplementation",
    liquidityPool.address
  );
  await liquidityPoolProxy.initialize(deployer.address);
  console.log("Liquidity Pool initialized!");

  await liquidityPoolProxy.updateProtocolParams(
    oc.address,
    [wethAddr, usdcAddr, daiAddr, wbtcAddr],
    [1, 1, 1, 1],
    [wethAddr, usdcAddr, daiAddr, wbtcAddr],
    [amount, amount, amount, amount]
  );
  console.log("OC params set!");

  await liquidityPoolProxy.updateProtocolParams(
    ucFactory.address,
    [wethAddr, usdcAddr, daiAddr, wbtcAddr],
    [1, 1, 1, 1],
    [wethAddr, usdcAddr, daiAddr, wbtcAddr],
    [amount, amount, amount, amount]
  );
  console.log("UC params set!");

  const OCImplementation = await ethers.getContractFactory("OCImplementation");
  ocImplementation = await OCImplementation.deploy(
    liquidityPool.address,
    oracle.address,
    wethAddr,
    usdcAddr,
    daiAddr,
    wbtcAddr
  );
  await ocImplementation.deployed();
  console.log("OC implementation deployed at:", ocImplementation.address);

  await proxyAdmin.upgrade(oc.address, ocImplementation.address);
  console.log("OC implementation upgraded!");

  const ocProxy = await ethers.getContractAt("OCImplementation", oc.address);
  await ocProxy.initialize();
  console.log("OC initialized!");

  const AaveInteractor = await ethers.getContractFactory("AaveInteractor");
  aaveInteractor = await AaveInteractor.deploy(
    aaveV2LendingPool,
    aaveV2DataProvider,
    wethAddr,
    usdcAddr,
    daiAddr,
    wbtcAddr
  );
  await aaveInteractor.deployed();
  console.log("Aave interactor deployed at:", aaveInteractor.address);

  const UCWalletImplementation = await ethers.getContractFactory(
    "UCWalletImplementation"
  );
  ucWalletImplementation = await UCWalletImplementation.deploy(
    liquidityPool.address,
    oracle.address,
    aaveV2DataProvider,
    aaveInteractor.address,
    wethAddr,
    usdcAddr,
    daiAddr,
    wbtcAddr
  );
  await ucWalletImplementation.deployed();
  console.log(
    "UC wallet implementation deployed at:",
    ucWalletImplementation.address
  );

  await proxyAdmin.upgrade(ucWallet.address, ucWalletImplementation.address);
  console.log("UC wallet implementation upgraded!");

  const UCFactoryImplementation = await ethers.getContractFactory(
    "UCFactoryImplementation"
  );
  ucFactoryImplementation = await UCFactoryImplementation.deploy(
    liquidityPool.address,
    ucWallet.address
  );
  await ucFactoryImplementation.deployed();
  console.log(
    "UC factory implementation deployed at:",
    ucFactoryImplementation.address
  );

  await proxyAdmin.upgrade(ucFactory.address, ucFactoryImplementation.address);
  console.log("UC factory implementation upgraded!");

  const NftManagerImplementation = await ethers.getContractFactory(
    "NftManagerImplementation"
  );
  nftManagerImplementation = await NftManagerImplementation.deploy(
    ucFactory.address,
    liquidityPool.address
  );
  await nftManagerImplementation.deployed();
  console.log(
    "Nft manager implementation deployed at:",
    nftManagerImplementation.address
  );

  await proxyAdmin.upgrade(
    nftManager.address,
    nftManagerImplementation.address
  );
  console.log("Nft manager implementation upgraded!");

  const UIDataProvider = await ethers.getContractFactory("UIDataProvider");
  uiDataProvider = await UIDataProvider.deploy(
    liquidityPool.address,
    oc.address,
    nftManager.address,
    oracle.address,
    aaveV2DataProvider,
    ucFactory.address,
    aaveV2LendingPool,
    wethAddr,
    usdcAddr,
    daiAddr,
    wbtcAddr
  );
  await uiDataProvider.deployed();
  console.log("UI data provider deployed at:", uiDataProvider.address);
}

main();
