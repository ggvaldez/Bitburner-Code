import * as commLib from '/lib/commLib.js'
/** @param {NS} ns */
export async function main(ns) {
  commLib.initialize(ns)

  var playerData = commLib.getPlayerData()
  if (playerData == undefined){
    playerData = {}
  }
for (var [property,data] of Object.entries(ns.getPlayer())){
}
commLib.setPlayerData(playerData)
}