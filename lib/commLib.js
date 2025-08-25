/** @param {NS} ns */
const startFile = 
{
  configs:{ 
    libFiles: ["/lib/secThread.js", "/lib/growThread.js", "/lib/hackThread.js", "/lib/shareThread.js"]
  }
}

var commFile;
var ns
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

 function read(){
  commFile = JSON.parse( ns.read(filename))
  if (commFile == undefined)
      commFile = startFile
  return commFile
}
 function write(){
   ns.write(filename,JSON.stringify(commFile),"w")
}
export function initialize(ns2){
    ns = ns2
    read()
}