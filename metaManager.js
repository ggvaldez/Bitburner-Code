import * as commLib from '/lib/commLib.js'

/** @param {NS} ns */
export async function main(ns) {
      ns.killall("home")
      while(true){
            var runOrder = [
            "/lib/playerData.js",         // 2.10GB Base + getPlayer()
            "/lib/serverTree.js",         // 1.80GB Base + scan()
            "/lib/populateServerData.js", // 3.60GB Base + getServer()
            "/lib/torBuyer.js",           // 3.60GB Base + singularity.purchaseTor() -> 16x if File 1
            "/lib/programBuyer.js",       // 3.60GB Base + singularity.purchaseProgram() -> 16x if File 1
            "/lib/getRoot.js",            // 1.75GB Base + fileExists() + nuke()
            "/lib/getBackdoor.js",        // 7.60GB Base + singularity.getCurrentServer, Connect, installBackdoor -> 16x if File 1
            "/lib/copyLibs.js",           // 2.20GB Base + scp()
            "/lib/decideHGW.js",          // 5.10GB Base + exec + growthAnalyze + hackAnalyze + getTimeSinceLastAug + getGrowTime + getWeakenTime + getHackTime
            "/lib/shareRam.js"            // 2.90GB Base + exec
            
      ]
      for (var file of runOrder) {
           // ns.tprint("INFO DEBUG: Starting " + file)
            if (ns.run(file,{preventDuplicates:true,temporary:true}) == 0) ns.print("Could not Run " + file + " !!")
            await ns.sleep(100)
            }
      await ns.sleep(1000)
      }
      
}