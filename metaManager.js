import * as commLib from '/lib/commLib.js'

/** @param {NS} ns */
export async function main(ns) {
  ns.run("/lib/playerData.js")
  ns.run("/lib/serverTree.js") 
        // 1.8GB - Base(1.6GB) + ns.scan (0.2GB)
  await ns.sleep(100)
  ns.run("/lib/populateServerData.js") 
        // 3.6GB = Base(1.6GB) + ns.getServer (2GB)
  await ns.sleep(100)
  ns.run("/lib/getRoot.js")
        // 1.75GB - Base(1.6GB) + ns.fileExists (0.1GB) + 
        // brutessh || ftpcrack || relaysmtp || httpworm || sqlinject || nuke (0.05GB) -> ONLY ONE OF THEM
  ns.run("/lib/copyLibs.js")
        // 2.2GB - Base(1.6GB) + ns.scp (0.6GB)
}