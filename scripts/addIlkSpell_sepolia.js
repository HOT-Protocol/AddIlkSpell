const BigNumber = require('bignumber.js');
const web3 = require('web3')
let { addrList,getContractByABI,executeContract,getContract,getProxyslot,encodeFunction,sendTransaction,deploy,saveAddr,create,logTx,addrListAddObject } = require('./lib')
const hre = require("hardhat");
const fs = require("fs");
const {execSync} = require("child_process");
let configjson;
/*

*/

async function main() {
  let chain = 'sepolia'
  let ilkPrefix = 'nSHZH'
  let tokenIds = [1]
  let prices = ['1000']
  let HouseWrapper = '0xF9DCeC3051D23Df7c3690acd3eCb04a310380A23'
  let SpellRegist = '0x2e1Edaf6c840e28b056c9a409C1B0D263a2F0199'
  let DssAddIlkSpellPorxy = '0x04577b57128A0Ab3F0f2e275c4029011d2C0bb57'
  let SpellRegistABI = [{"inputs":[{"internalType":"uint256","name":"_line","type":"uint256"},{"internalType":"uint256","name":"_indate","type":"uint256"},{"internalType":"address[]","name":"_signers","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"spell","type":"address"}],"name":"Regist","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":false,"internalType":"address","name":"spell","type":"address"},{"indexed":false,"internalType":"string","name":"desc","type":"string"}],"name":"SendProposal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"usr","type":"address"}],"name":"VoteProposal","type":"event"},{"inputs":[],"name":"authORG","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"usr","type":"address"}],"name":"deny","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getProposalMSG","outputs":[{"internalType":"address","name":"spell","type":"address"},{"internalType":"address","name":"sender","type":"address"},{"internalType":"string","name":"desc","type":"string"},{"internalType":"uint256","name":"expire","type":"uint256"},{"internalType":"enum Vote.Status","name":"status","type":"uint8"},{"internalType":"address[]","name":"approveds","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"indate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"isApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spell","type":"address"}],"name":"isAuthSpell","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"line","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"poa","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pom","outputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"address","name":"spell","type":"address"},{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"expire","type":"uint256"},{"internalType":"string","name":"desc","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"popi","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"usr","type":"address"}],"name":"rely","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spell","type":"address"},{"internalType":"string","name":"desc","type":"string"}],"name":"sendProposal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"org","type":"address"}],"name":"setAuthORG","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"vaule","type":"uint256"}],"name":"setIndate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"vaule","type":"uint256"}],"name":"setLine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"flag","type":"bool"}],"name":"setPause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"signerCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"signers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"sopi","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  let HouseWrapperABI = [{"inputs":[{"internalType":"address","name":"nft","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"usr","type":"address"}],"name":"changeHolder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wrap","type":"address"},{"indexed":false,"internalType":"address","name":"holder","type":"address"}],"name":"ChangeHolder","type":"event"},{"inputs":[{"internalType":"address","name":"usr","type":"address"}],"name":"deny","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"mintAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"contract HouseWrap","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"usr","type":"address"}],"name":"rely","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"setHouseToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nft","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"wrapper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"nft","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"wrap","type":"address"},{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"Wrapper","type":"event"},{"inputs":[],"name":"erc721","outputs":[{"internalType":"contract houseToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"wrap","type":"address"}],"name":"getWrapHolder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"wrapOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
  SpellRegist = await getContractByABI(SpellRegist,SpellRegistABI)
  HouseWrapper = await getContractByABI(HouseWrapper,HouseWrapperABI)
  DssAddIlkSpellPorxy = await getContract('DssAddIlkSpell',DssAddIlkSpellPorxy)

  await exec(DssAddIlkSpellPorxy,SpellRegist,HouseWrapper,ilkPrefix,tokenIds,prices,chain)
}
//

async function exec(DssAddIlkSpellPorxy,SpellRegist,HouseWrapper,ilkPrefix,tokenIds,prices,chain) {
  let filePath = `./log/addIlkSpell_${chain}.log`
  create(filePath,'')
  if(tokenIds.length !=prices.length){throw 'The number of parameters is different';}
  let erc721 = await HouseWrapper.erc721()
  let wrapOf
  let ilk
  let i=0;
  while(i<tokenIds.length){
    wrapOf = await HouseWrapper.wrapOf(erc721, tokenIds[i])
    if(wrapOf =='0x0000000000000000000000000000000000000000'){throw 'wrapOf method query to 0 address';}
    ilk = addSuffixAndNumberToBytes32(ilkPrefix,tokenIds[i])
    await sendTransaction("DssAddIlkSpellPorxy",0,DssAddIlkSpellPorxy.address,"addIlkSpell",
        ['bytes32','address','uint256'],
        [ilk,wrapOf,hre.ethers.utils.parseEther(prices[i]).toString()])

    let addIlk = await DssAddIlkSpellPorxy.addIlk(ilk)
    if(addIlk ==0){throw 'ilk not exist';}
    let addIlkSpellMsg = await DssAddIlkSpellPorxy.addIlkSpellMsg(addIlk)
    let valueMsg = await DssAddIlkSpellPorxy.valueMsg()
    //console.log(valueMsg)
    addLog(addIlkSpellMsg,valueMsg,filePath)
    await addSpellRegist(addIlkSpellMsg.spell,SpellRegist,`addilk tokenId ${tokenIds[i]}`)
    i++
  }
  await executeContract("DssAddIlkSpellPorxy",0,DssAddIlkSpellPorxy,"scheduleAndCast",tokenIds)

}
function addLog(addIlkSpellMsg,valueMsg,filePath) {
  let duty = calcRate(valueMsg[4].toString())
  let data = `\n${new Date().format("yyyy-MM-dd  hh:mm:ss")}  
       ilk:        ilkString:  ${web3.utils.hexToString(addIlkSpellMsg[0])}
                   ilk:        ${addIlkSpellMsg[0]}
                   token:      ${addIlkSpellMsg[1]}
                   join:       ${addIlkSpellMsg[2]}
                   flip:       ${addIlkSpellMsg[3]}
                   pip:        ${addIlkSpellMsg[4]}
                   spell:      ${addIlkSpellMsg[5]}
       parmdata：            
                   line:       ${valueMsg[0]}
                   dust:       ${valueMsg[1]}
                   dunk:       ${valueMsg[2]}
                   chop:       ${valueMsg[3]}
                   duty:       ${valueMsg[4]}  -- ${duty}
                   beg:        ${valueMsg[5]} 
                   ttl:        ${valueMsg[6]}   
                   tau:        ${valueMsg[7]}   
                   mat:        ${valueMsg[8]}    
    \n`
  console.log(data)
  fs.appendFile(filePath,data, 'utf8',
      function(err) {
        if (err){
          throw err
          console.log(err)
        }
      });
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
function addSuffixAndNumberToBytes32(inputString, number) {
  const modifiedString = `${inputString}${number.toString().padStart(5, '0')}-A`;
  const bytes32Value = ethers.utils.formatBytes32String(modifiedString);
  return bytes32Value;
}
async function addSpellRegist(addSpellAddr,SpellRegistContract,desc) {
  await executeContract('SpellRegistContract',0,SpellRegistContract,'sendProposal',addSpellAddr,desc)
  let lastId = await SpellRegistContract.lastId()
  await executeContract('SpellRegistContract',1,SpellRegistContract,'vote',lastId.toString())

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
