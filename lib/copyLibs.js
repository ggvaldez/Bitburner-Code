import * as commLib from 'lib/commLib.js'
/** @param {NS} ns */
export async function main(ns) {
  commLib.initialize(ns);
  var server = commLib.getServerTree()
  var configs = commLib.getConfigs()
  for (const [hostname, data] of Object.entries(server)) {
    if (hostname != "home" && !hostname.includes("hacknet-server")) {
      ns.scp(configs.libFiles, hostname, "home")
    }
  }
}
