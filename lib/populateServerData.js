import * as commLib from '/lib/commLib.js'
/** @param {NS} ns */
export async function main(ns) {
  commLib.initialize(ns)
  var serverTree = commLib.getServerTree()
  for (var [hostname, data] of Object.entries(serverTree)) {
    var serverData = ns.getServer(hostname)
    for (var [item, mydata] of Object.entries(serverData)) {
      data[item] = mydata
    }
    if (data.backdoorInstalled && data.parent != "home") {
      data.parent = "home"
      data.hops = 1
      data.links.push("home")
      serverTree["home"]["links"].push(hostname)
    }
  }

commLib.setServerTree(serverTree)
}