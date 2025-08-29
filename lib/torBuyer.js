import * as commLib from '/lib/commLib.js'
/** @type import("..").NS */
var ns
export async function main(_ns) {
  ns = _ns
  commLib.initialize(ns);
  var playerData = commLib.getPlayerData()
  ns.singularity.purchaseTor()
  playerData.hasTor = true
  commLib.setPlayerData(playerData)
}