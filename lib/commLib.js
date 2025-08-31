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
  return commFile["configs"]
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
export function getFactions(){
   read()
  return commFile["factions"]
}
export function setFactions(contracts){
  commFile["factions"] = contracts
   write()
}


 function read(){
  commFile = ns.read(filename)
  if(commFile == ""){
    commFile = startFile
  }else{
    commFile = JSON.parse( ns.read(filename))
  }
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