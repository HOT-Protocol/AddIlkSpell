const BigNumber = require('bignumber.js');
const web3 = require('web3')
let { addrList,getContractByABI,executeContract,getContract,getProxyslot,encodeFunction,sendTransaction,deploy,saveAddr,create,logTx,addrListAddObject } = require('./lib')
const hre = require("hardhat");
const fs = require("fs");
const {execSync} = require("child_process");
/*

*/

async function main() {
  let DssAddIlkSpellPorxy = '0xF93B5066124F0a30F7a71d7055d5a8FF3210fA5e'
  DssAddIlkSpellPorxy = await getContract('DssAddIlkSpellV2',DssAddIlkSpellPorxy)

  let line; let dust; let dunk; let chop; let duty; let beg; let ttl; let tau; let mat;
  let parm =['dunk','duty']
  let value =['2','4']

  await exec(DssAddIlkSpellPorxy,parm,value)
}
//
async function exec(DssAddIlkSpellPorxy,parm,value) {
  if(parm.length !=value.length){throw 'The number of parameters is different';}
  for(let i=0;i<parm.length;i++){
    if(parm[i]=='duty'){
      value[i]= calcYearRate(value[i])
    }
  }
  await executeContract('DssAddIlkSpellPorxy',0,DssAddIlkSpellPorxy,'updateValue',parm,value)
  let valueMsg = await DssAddIlkSpellPorxy.valueMsg()
  console.log(valueMsg)
  let duty = calcRate(valueMsg[4].toString())
  console.log("duty:",duty)
}
function calcRate(duty) {
  const dividedNumber = new BigNumber(duty).dividedBy("1e27").toString();
  const lnBase = Math.log(dividedNumber);
  const result = lnBase * 31536000;
  let approxResult = new BigNumber(Math.exp(result));
  approxResult = approxResult.toFixed(5).toString()
  const percentage = (approxResult - 1) * 100;
  const formattedPercentage = percentage.toFixed(2) + "%";
  return formattedPercentage
}
function calcYearRate(yearRate) {
  const baseInExponential = execSync(`echo "scale=27; e( l(${yearRate} / 100 + 1)/(60 * 60 * 24 * 365)) * 10^27" | bc -l`).toString().trim();
  return  baseInExponential.split(".")[0]
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  saveAddr(addrList)
  console.error("error:",error);
  process.exitCode = 1;
});
