import * as commLib from '/lib/commLib.js'
/** @type import("..").NS */
var ns
export async function main(_ns) {
  ns = _ns
  commLib.initialize(ns);
  var server = commLib.getServerTree()
  var playerData = commLib.getPlayerData()
  var hackFiles = [
    { file: "BruteSSH.exe", port: "ssh", portsNeeded: 1, cost: 500000 },
    { file: "FTPCrack.exe", port: "ftp", portsNeeded: 2, cost: 1500000 },
    { file: "RelaySMTP.exe", port: "smtp", portsNeeded: 3, cost: 5000000 },
    { file: "HTTPWorm.exe", port: "http", portsNeeded: 4, cost: 30000000 },
    { file: "SQLInject.exe", port: "sql", portsNeeded: 5, cost: 250000000 }]
  var portsNeeded = 0
  for (const [hostname, data] of Object.entries(server)) {
    if (data.moneyMax > 0 && data.requiredHackingSkill < playerData.skills.hacking)
      portsNeeded = Math.max(data.numOpenPortsRequired, portsNeeded)
  }
  for (var hackFile of hackFiles){
    if (hackFile.portsNeeded <= portsNeeded){
      ns.singularity.purchaseProgram(hackFile.file)
    }
  }
}