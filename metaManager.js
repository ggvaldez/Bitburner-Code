import * as commLib from '/lib/commLib.js'

/** @param {NS} ns */
export async function main(ns) {
      ns.killall("home")
      while(true){
            var runOrder = [
            "/lib/playerData.js",
            "/lib/serverTree.js",
            "/lib/populateServerData.js",
            "/lib/torBuyer.js",
            "/lib/programBuyer.js",
            "/lib/virusBuyer.js",
            "/lib/getRoot.js",
            "/lib/getBackdoor.js",
            "/lib/copyLibs.js",
            "/lib/decideHGW.js",
            "/lib/shareRam.js"
            
      ]
      for (var file of runOrder) {
           // ns.tprint("INFO DEBUG: Starting " + file)
            if (ns.run(file,{preventDuplicates:true,temporary:true}) == 0) ns.print("Could not Run " + file + " !!")
            await ns.sleep(100)
            }
      await ns.sleep(1000)
      }
      
}