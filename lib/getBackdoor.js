import * as commLib from '/lib/commLib.js'
/** @type import("..").NS */
var ns

var serverTree
var playerData
var wentTo = {}

/*
async function walkBackdoor(currentNode) {
    var oldparent = serverTree[currentNode].parent
    wentTo[currentNode] = true
    //ns.tprint("conn:" + ns.singularity.connect(currentNode))
    //ns.tprint("currentNode:" + currentNode)
    //ns.tprint("parent:" + oldparent)
    ns.singularity.connect(currentNode)
    if (!serverTree[currentNode].backdoorInstalled && serverTree[currentNode].requiredHackingSkill <= playerData.skills.hacking
         && !serverTree[currentNode].purchasedByPlayer && currentNode != "home") {
        ns.tprint("backdoor:" + currentNode)
        await ns.singularity.installBackdoor()
        serverTree[currentNode].backdoorInstalled = true
        var oldparent = serverTree[currentNode].parent
        if (serverTree[currentNode].parent != "home") {
            serverTree[currentNode].parent = "home"
            serverTree[currentNode].hops = 1
            serverTree[currentNode].links.push("home")
            serverTree["home"]["links"].push(currentNode)
        }
    }
    for (var nextNode of serverTree[currentNode].links) {
        if (wentTo[nextNode] != true) {
            await walkBackdoor(nextNode)
            if(currentNode != "home") await ns.singularity.connect(oldparent)
        }
    }
}
*/
export async function main(_ns) {
    ns = _ns
    //ns.tprint("start!")
    commLib.initialize(ns)
    serverTree = commLib.getServerTree()
    playerData = commLib.getPlayerData()
    var currentServer = ns.singularity.getCurrentServer()
    for (var [hostname, data] of Object.entries(serverTree)) {
        if (!data.backdoorInstalled && data.requiredHackingSkill <= playerData.skills.hacking
        && data.hasAdminRights && !data.purchasedByPlayer && hostname != "home") {
            var connectList = []
            var host = hostname
            while (host != "home"){
                connectList.push(host)
                host = serverTree[host].parent
            }
            //ns.tprint(connectList)
            //ns.tprint(connectList.length)
            //await ns.sleep(100)
            for (var i = connectList.length -1 ; i >= 0; i--){
                //ns.tprint(connectList[i])
                //await ns.sleep(100)
                ns.ui.openTail()
                ns.singularity.connect(connectList[i]);
            }
            await ns.singularity.installBackdoor()
        }
    }
    ns.singularity.connect(currentServer)
}


