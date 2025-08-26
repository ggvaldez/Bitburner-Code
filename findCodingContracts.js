import * as commLib from 'lib/commLib.js'
/** @param {NS} ns */
export async function main(ns) {
  commLib.initialize(ns)
  var serverTree = commLib.getServerTree()
  var codingContracts = []
  for (const [hostname, data] of Object.entries(serverTree)) {
    var localContracts = ns.ls(hostname, ".cct")
    if (localContracts.length > 0) {
      for (var file of localContracts) {
        var obj = { host: hostname, file: file }
        for (const [key, value] of Object.entries(ns.codingcontract.getContract(file,hostname))){
            obj[key] = value
        }
        codingContracts.push(obj)
      }

    }
  }
  commLib.setContracts(codingContracts)
}

