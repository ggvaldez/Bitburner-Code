/** @type import("..").NS */
var ns = null

const startFile = 
{
  configs:{ 
    libFiles: ["/lib/secThread.js", "/lib/growThread.js", "/lib/hackThread.js", "/lib/shareThread.js"]
  }
}

var commFile;

const filename = "commFile.json"

export function getServerTree(){
   read()
  return commFile["serverTree"]
}
export function setServerTree(serverTree){
  commFile["serverTree"] = serverTree
   write()
}
export function getPlayerData(){
   read()
  return commFile["playerData"]
}
export function setPlayerData(playerData){
  commFile["playerData"] = playerData
   write()
}
export function getConfigs(){
   read()
  return commFile["playerData"]
}
export function setConfigs(configs){
  commFile["configs"] = configs
   write()
}
export function getContracts(){
   read()
  return commFile["contracts"]
}
export function setContracts(contracts){
  commFile["contracts"] = contracts
   write()
}


 function read(){
  commFile = JSON.parse( ns.read(filename))
  if (commFile == undefined)
      commFile = startFile
  return commFile
}
 function write(){
   ns.write(filename,JSON.stringify(commFile, (key, value) => {
        if (typeof value === 'bigint') {
            return value.toString(); // Convert BigInt to string
        }
        return value;
    }),"w")
}
export function initialize(ns2){
    ns = ns2
    read()
}