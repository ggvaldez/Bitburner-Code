import * as commLib from '/lib/commLib.js'
/** @type import("..").NS */
var ns


export async function main(_ns) {
    ns = _ns;
    commLib.initialize(ns);
    var server = commLib.getServerTree()
    for (var [hostname, data] of Object.entries(server)) {
      var shareThreads = Math.floor((data.maxRam - data.ramUsed) / 4)
      if (hostname == "home") {
        shareThreads -= 2
      }
      if (!hostname.includes("hacknet-server") && shareThreads > 0 && ns.exec("/lib/" + "shareThread.js", hostname, shareThreads)) {
        data.usedRam += 4 * shareThreads;
        data.availableRam -= 4 * shareThreads;
      }
    }
}