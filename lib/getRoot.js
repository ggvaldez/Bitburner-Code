import * as commLib from '/lib/commLib.js'
/** @param {NS} ns */
export async function main(ns) {
  commLib.initialize(ns);
  var server = commLib.getServerTree()
  var portToOpen = undefined
  var hackFiles = [
    { file: "BruteSSH.exe", port: "ssh", cost: 250000 },
    { file: "FTPCrack.exe", port: "ftp", cost: 1500000 },
    { file: "RelaySMTP.exe", port: "smtp", cost: 5000000 },
    { file: "HTTPWorm.exe", port: "http", cost: 30000000 },
    { file: "SQLInject.exe", port: "sql", cost: 250000000 }]
  for (var hackFile of hackFiles) {
    for (const [hostname, data] of Object.entries(server)) {
      if (hostname != "home" && !hostname.includes("hacknet-server")) {
        if (ns.fileExists(hackFile.file) && !data[hackFile.port + "PortOpen"] && 
        (portToOpen == undefined || portToOpen == hackFile.port)) { // this test avoids opening many ports on the same exec, saving 0.2GB RAM
          data[hackFile.port + "PortOpen"] = ns[hackFile.file.replace(".exe", "").toLowerCase()](hostname)
          portToOpen = hackFile.port
        }
      }
    }
  }
  
  for (const [hostname, data] of Object.entries(server)) {
    if(portToOpen != undefined){
    var openPortCount = 0
    for (var hackFile of hackFiles) {
        if(data[hackFile.port + "PortOpen"]) openPortCount++
    }
    data.openPortCount = openPortCount
    }else if (!data.hasAdminRights && data.numOpenPortsRequired <= data.openPortCount) { //Nuke only runs if no port was open this cycle, saving 0.05GB
        data.hasAdminrights = ns.nuke(hostname)
    }
    
    var openPortCount = 0
    for (var hackFile of hackFiles) {
        if(data[hackFile.port + "PortOpen"]) openPortCount++
    }
    data.openPortCount = openPortCount
  }
  commLib.setServerTree(server)
}
