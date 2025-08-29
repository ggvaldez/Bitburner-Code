import * as commLib from '/lib/commLib.js'
/** @type import("..").NS */
var ns
var threadSize = 2;
var sleepTime = 10500
var hackLimit = 0.8
var maxSecDiff = 5


export async function main(_ns) {
    ns = _ns;
    commLib.initialize(ns);
    var server = commLib.getServerTree()
    var playerData = commLib.getPlayerData()
    playerData.time = ns.getTimeSinceLastAug()
    var threadOpenList = [];
    var threadToRunList = [];
    var openThreads = 0;
    var hostname, data;
    for ([hostname, data] of Object.entries(server)) {

        if (data.moneyMax != 0 && data.requiredHackingSkill <= playerData.skills.hacking && data.hasAdminRights) {
            if (data.moneyAvailable < data.moneyMax && data.hackDifficulty <= data.minDifficulty + maxSecDiff && data.timeNextGrow < playerData.time) {
                var growObj = {
                    hostname: hostname,
                    threads: Math.ceil(ns.growthAnalyze(hostname, data.moneyMax / Math.max(1, data.moneyAvailable))),
                    type: "growThread.js"
                }
                threadToRunList.push(growObj)
                data.timeNextGrow = ns.getGrowTime(hostname) + playerData.time
            }
            if (data.hackDifficulty > data.minDifficulty && data.timeNextWeaken < playerData.time) {
                var secObj = {
                    hostname: hostname,
                    threads: Math.ceil((data.hackDifficulty - data.minDifficulty) / 0.05),
                    type: "weakenThread.js"
                }
                data.timeNextWeaken = ns.getWeakenTime(hostname) + playerData.time
                threadToRunList.push(secObj)
            }

            if (data.hackDifficulty <= data.minDifficulty + maxSecDiff && data.moneyAvailable > (1 - hackLimit) * data.moneyMax && data.timeNextHack < playerData.time) {
                var totThreads = Math.ceil((1 / ns.hackAnalyze(hostname)) * hackLimit)
                var hackObj = {
                    hostname: hostname,
                    threads: totThreads,
                    type: "hackThread.js"
                }
                threadToRunList.push(hackObj)
                data.timeNextHack = ns.getHackTime(hostname) + playerData.time
            }
        }

    }
    //ns.tprint("threadtorun:", threadToRunList)
    var runThread = undefined
    for ([hostname, data] of Object.entries(server)) {
        var avoid_loop = 10000
        while (avoid_loop > 0) {
            if (avoid_loop < 3) {
                ns.tprint("avoid loop " + hostname + " " + data + " " + runThread)
                await ns.sleep(1000)
            }
            avoid_loop -= 1      // @ignore infinite
            var hostThread = Math.floor((data.maxRam - data.ramUsed) / threadSize)
            if(hostname == "home") hostThread -= 8
            if (hostThread <= 0) {
                break
            }
            if (runThread == undefined || runThread.threads <= 0) {
                if (threadToRunList.length == 0) {
                    break
                }
                runThread = threadToRunList.pop();
            }
            var numThreads = Math.min(runThread.threads, hostThread);
            ns.exec("/lib/" + runThread.type, hostname, numThreads, runThread.hostname)
            runThread.threads -= numThreads;
            hostThread -= numThreads
        }
    }

    commLib.setServerTree(server)
    commLib.setPlayerData(playerData)
}