
const web3 = require('web3')
let { addrList,getContractByABI,executeContract,getContract,getProxyslot,encodeFunction,sendTransaction,deploy,saveAddr,createFile,logTx,addrListAddObject } = require('./lib')
const hre = require("hardhat");
const fs = require("fs");
const {execSync} = require("child_process");
let configjson;
/*
总gas：5300000
*/

async function main() {
  await createFile()
  var data=fs.readFileSync('./config/config.json','utf-8');
  configjson = JSON.parse(data.toString());
  await exec()
  saveAddr(addrList)
}

async function exec() {
  let ILK_DEPLOYER = await deploy('ILK_DEPLOYER',0,'IlkDeployer')
  let PIP = await deploy('PIP',0,'DSValue')
  let FLIP = await deploy('FLIP',0,'Flipper')
  let JOIN = await deploy('JOIN',0,'GemJoin5')
  let PIP_BEACON = await deploy('PIP_BEACON',0,'UpgradeableBeacon',PIP.address)
  let FLIP_BEACON = await deploy('FLIP_BEACON',0,'UpgradeableBeacon',FLIP.address)
  let JOIN_BEACON = await deploy('JOIN_BEACON',0,'UpgradeableBeacon',JOIN.address)
  let DssAddIlkSpell = await deploy('DssAddIlkSpell',0,'DssAddIlkSpell')
  let DssAddIlkSpellPorxy = await deploy('DssAddIlkSpellPorxy',0,'DssAddIlkSpellPorxy',DssAddIlkSpell.address)
  DssAddIlkSpellPorxy = await getContract('DssAddIlkSpell',DssAddIlkSpellPorxy.address)
  await executeContract("PIP_BEACON",0,PIP_BEACON,"transferOwnership",DssAddIlkSpellPorxy.address)
  await executeContract("FLIP_BEACON",0,FLIP_BEACON,"transferOwnership",DssAddIlkSpellPorxy.address)
  await executeContract("JOIN_BEACON",0,JOIN_BEACON,"transferOwnership",DssAddIlkSpellPorxy.address)
  let duty =calcYearRate(configjson.duty)
  await executeContract("DssAddIlkSpellPorxy",0,DssAddIlkSpellPorxy,"initialize",
      configjson.executor,
      [configjson.MCD_PAUSE,configjson.MCD_VAT,configjson.MCD_CAT,configjson.MCD_JUG,configjson.MCD_END,configjson.MCD_SPOT,
        configjson.FLIPPER_MOM,configjson.ILK_REGISTRY,ILK_DEPLOYER.address,JOIN_BEACON.address,FLIP_BEACON.address,PIP_BEACON.address],
      [configjson.line,configjson.dust,configjson.dunk,configjson.chop,duty,configjson.beg,configjson.ttl,configjson.tau,configjson.mat]
      )


}
function calcYearRate(yearRate) {
  const baseInExponential = execSync(`echo "scale=27; e( l(${yearRate} / 100 + 1)/(60 * 60 * 24 * 365)) * 10^27" | bc -l`).toString().trim();
  return  baseInExponential.split(".")[0]
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  saveAddr(addrList)
  console.error(error);
  process.exitCode = 1;
});
