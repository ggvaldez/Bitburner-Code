import * as commLib from 'lib/commLib.js'
/** @param {NS} ns */
export async function main(ns) {
  commLib.initialize(ns)
  var serverTree = commLib.getServerTree()

}