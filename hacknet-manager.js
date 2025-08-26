/** @param {NS} ns */
export async function main(ns) {
  var minprice
  var hn = ns.hacknet
  //var upMax = 100

  var sellMax = 10000
  //if (hn.spendHashes("Improve Studying")) {
  //  await ns.sleep(8000)
    while (hn.spendHashes("Sell for Money") ) {
      //await ns.sleep(100)
    }
  //}
  var buy
  if (true) {
    do {
      //upMax++
      buy = { type: "Node", node: 0, cost: Number.MAX_SAFE_INTEGER }
      for (var i = 0; i < hn.numNodes(); i++) {
        if (hn.getLevelUpgradeCost(i) < buy.cost && hn.getLevelUpgradeCost(i) > 0) {
          buy = { type: "Level", node: i, cost: hn.getLevelUpgradeCost(i) }
          //    ns.tprint("buycost: ", buy.cost, " buy.type:", buy.type, " player max monies: ", ns.getPlayer().money)
        }
        if (hn.getCacheUpgradeCost(i) < buy.cost && hn.getCacheUpgradeCost(i) > 0) {
          buy = {
            type: "Cache", node: i, cost: hn.getCacheUpgradeCost(i)
          }
          //    ns.tprint("buycost: ", buy.cost, " buy.type:", buy.type, " player max monies: ", ns.getPlayer().money)
        }
        if (hn.getCoreUpgradeCost(i) < buy.cost && hn.getCoreUpgradeCost(i) > 0) {
          buy = {
            type: "Core", node: i, cost: hn.getCoreUpgradeCost(i)
          }
          //    ns.tprint("buycost: ", buy.cost, " buy.type:", buy.type, " player max monies: ", ns.getPlayer().money)
        }
        if (hn.getRamUpgradeCost(i) < buy.cost && hn.getRamUpgradeCost(i) > 0) {
          buy = {
            type: "Ram", node: i, cost: hn.getRamUpgradeCost(i)
          }
          //   ns.tprint("buycost: ", buy.cost, " buy.type:", buy.type, " player max monies: ", ns.getPlayer().money)
        }
      }
      if (hn.getPurchaseNodeCost() < buy.cost && hn.getPurchaseNodeCost() > 0) {
        buy = { type: "Node", cost: hn.getPurchaseNodeCost() }
        buy.cost = hn.getPurchaseNodeCost()
      }
      //ns.tprint(buy)
      if (buy.cost * 10 < ns.getPlayer().money) {
        switch (buy.type) {
          case "Level": hn.upgradeLevel(buy.node);
          case "Cache": hn.upgradeCache(buy.node);
          case "Core": hn.upgradeCore(buy.node);
          case "Ram": hn.upgradeRam(buy.node);
          case "Node": hn.purchaseNode()
        }
      }// else if (upMax < 3) {
      //await ns.sleep(100)
      // ns.tprint("buycost: ", buy.cost, " buy.type:", buy.type, " player max monies: ", ns.getPlayer().money)
      //}
    } while (buy.cost * 10 < ns.getPlayer().money)// && upMax > 0)

  }
}