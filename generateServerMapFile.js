/** @param {NS} ns */
var ns = null

var hacklimit = 0.1 // max % of missing money 
var improveLimit = 0.01
var minPercGrow = 0.3
var minSecDiff = 0.5

function getRoot(hostname) {
  //if (ns.hasRootAccess(hostname)) {
  //  if (ns.scp(["secThread.js", "growThread.js", "hackThread.js"], hostname, "home")) {
  //    ns.tprint("Hack Installed!");
  //  } else {
  //    ns.tprint("Hack not copied");
  //  }
  //  return;
  //}
  var openPorts = 0;
  var hackFiles = [
    { file: "BruteSSH.exe", cost: 1500000 },
    { file: "FTPCrack.exe", cost: 1500000 },
    { file: "RelaySMTP.exe", cost: 5000000 },
    { file: "HTTPWorm.exe", cost: 30000000 },
    { file: "SQLInject.exe", cost: 250000000 }]
  for (const obj of hackFiles) {
    if (!ns.fileExists(obj.file) && ns.getPlayer().money > obj.cost) {
      // ns.run("buy.js",1,obj.file)


      if (ns.fileExists("brutessh.exe") && ns.brutessh(hostname)) {
        // ns.tprint("BruteSSH Port Open!");
        openPorts += 1;
      } else if (ns.getPlayer().money > 1500000 && !ns.hasRootAccess(hostname)&& ns.getServerRequiredHackingLevel(hostname) <= ns.getHackingLevel()) {
        ns.tprint("ERROR: MISSING " + "BruteSSH.exe for " + hostname)
      }
      if (ns.fileExists("ftpcrack.exe") && ns.ftpcrack(hostname)) {
        //  ns.tprint("FTPCrack Port Open!")
        openPorts += 1;
      } else if (ns.getPlayer().money > 1500000 && !ns.hasRootAccess(hostname) && ns.getServerRequiredHackingLevel(hostname) <= ns.getHackingLevel()) {
        ns.tprint("ERROR: MISSING " + "FTPCrack.exe for " + hostname)
      }
      if (ns.fileExists("relaysmtp.exe") && ns.relaysmtp(hostname)) {
        // ns.tprint("RelaySMTP Port Open!")
        openPorts += 1;
      } else if (ns.getPlayer().money > 5000000 && !ns.hasRootAccess(hostname) && ns.getServerRequiredHackingLevel(hostname) <= ns.getHackingLevel()) {
        ns.tprint("ERROR: MISSING " + "RelaySMTP.exe for " + hostname)
      }
      if (ns.fileExists("httpworm.exe") && ns.httpworm(hostname)) {
        //  ns.tprint("HTTPWorm Port Open!")
        openPorts += 1;
      } else if (ns.getPlayer().money > 30000000 && !ns.hasRootAccess(hostname) && ns.getServerRequiredHackingLevel(hostname) <= ns.getHackingLevel()) {
        ns.tprint("ERROR: MISSING " + "HTTPWorm.exe for " + hostname)
      }
      if (ns.fileExists("sqlinject.exe") && ns.sqlinject(hostname)) {
        //  ns.tprint("SQLInject Port Open!")
        openPorts += 1;
      } else if (ns.getPlayer().money > 250000000 && !ns.hasRootAccess(hostname) && ns.getServerRequiredHackingLevel(hostname) <= ns.getHackingLevel()) {
        ns.tprint("ERROR: MISSING " + "SQLInject.exe for " + hostname)
      }
    }
      //  ns.tprint("Starting Hack!");
      if (ns.getServerNumPortsRequired(hostname) <= openPorts && ns.nuke(hostname)) {
        //if (ns.getServerNumPortsRequired(hostname) <= 0 && ns.nuke(hostname)) {
        // ns.tprint("Nuke Successful!!");
      } else {
        //  ns.tprint("Nuke Failed - Ports Required: " + ns.getServerNumPortsRequired(hostname));
      }
      if (ns.scp(["/lib/secThread.js", "/lib/growThread.js", "/lib/hackThread.js", "/lib/shareThread.js"], hostname, "home")) {
        // ns.tprint("Hack Installed!");
      } else {
        // ns.tprint("Hack not copied");
      }
    
  }
}

export async function main(ns2) {
  ns = ns2;

  var serverlist = ["home"];
  var index = -1;
  var serverMap = {}
  var basicData = {
    totalMaxMoney: 0,
    totalAvailableMoney: 0,
    totalMissingMoney: 0,
    totalSecDiff: 0,
    totalGrowthMoney: 0,
    playerHackLevel: 0
  };
  basicData.playerHackLevel = ns.getHackingLevel();
  
  while (index < serverlist.length - 1) {
    index = index + 1;
    var hostname = serverlist[index];
    if (hostname != "home" && !hostname.includes("hacknet-server"))
      getRoot(hostname);
    if (!ns.hasRootAccess(hostname)) {
      continue;
    }
    if (true){//ns.getServerRequiredHackingLevel(hostname) <= player_hack_level) {
      var data = {
        maxMoney: Math.round(ns.getServerMaxMoney(hostname)),
        availableMoney: Math.round(ns.getServerMoneyAvailable(hostname)),
        missingMoney: 0,
        secLevel: ns.getServerSecurityLevel(hostname),
        secMin: ns.getServerMinSecurityLevel(hostname),
        secDiff: 0,
        maxRam: ns.getServerMaxRam(hostname),
        usedRam: ns.getServerUsedRam(hostname),
        procListHost: ns.ps(hostname),
        availableRam: 0,
        serverGrowth: ns.getServerGrowth(hostname),
        hackAnalyze: ns.hackAnalyze(hostname),
        hackLevel: ns.getServerRequiredHackingLevel(hostname),
        //growWeight: 0,
        //hackWeight: 0,
        //secWeight: 0,
        procListTarget: new Array()
        //growProcList: [],
        //hackProcList: [],
        //secProcList: [],
        //shareProcList: []
      };
      data.missingMoney = data.maxMoney - data.availableMoney;
      data.availableRam = data.maxRam - data.usedRam;
      data.secDiff = data.secLevel - data.secMin;
      if (hostname == "home") {
        data.maxMoney = 0;
        data.availableMoney = 0;
        data.missingMoney = 0;
        data.secDiff = 0;
      }
      basicData.totalAvailableMoney += data.availableMoney;
      basicData.totalMaxMoney += data.maxMoney
      basicData.totalGrowthMoney += data.maxMoney * data.serverGrowth
      basicData.totalSecDiff += data.secDiff
      basicData.totalMissingMoney += data.missingMoney
      for (proc of data.procListHost) {
        proc["filename"] = proc["filename"].replace("lib/", "")
      }
      for (proc of data.procListTarget) {
        proc["filename"] = proc["filename"].replace("lib/", "")
      }
      //ns.tprint(basicData.totalMissingMoney);

      //basicData.totalThreads += data.threads;
      serverMap[hostname] = data;
    }
    for (const new_name of ns.scan(hostname)) {
      if (!serverlist.includes(new_name)) {
        serverlist.push(new_name);
      }
    }
  }
  var hostname, data;
  //var first_loop = true
  //var recalculateWeights = false;
  //while (first_loop || recalculateWeights) {
  var listHack = []
  var listImprove = []
  var listSecure = []
  var newServerMap = {}
  for (const [hostname, data] of Object.entries(serverMap).sort(function (a, b) { return a[1].maxMoney - b[1].maxMoney })) {
    newServerMap[hostname] = data
  }
  serverMap = newServerMap
  for (const [hostname, data] of Object.entries(serverMap)) {
    //data.growWeight = data.missingMoney / basicData.totalMissingMoney;
    //data.hackWeight = data.availableMoney / basicData.totalAvailableMoney;
    //data.secWeight = data.secDiff / basicData.totalSecDiff;
    //ns.tprint(`data.maxMoney: ${data.maxMoney},data.serverGrowth: ${data.serverGrowth},basicData.totalGrowthMoney: ${basicData.totalGrowthMoney},`)
    if (data.secDiff > minSecDiff) {
      listSecure.push(hostname)
    }

    if (data.maxMoney * data.serverGrowth / basicData.totalGrowthMoney >= improveLimit && hostname != "home" &&
      data.missingMoney > data.maxMoney * minPercGrow) {
      listImprove.push(hostname)
      //ns.tprint("INFO: IMPROVE -> "+ hostname)
      //if(data.secDiff > minSecDiff){
      //  listSecure.push(hostname)
      //}
    }
    if (data.availableMoney / basicData.totalAvailableMoney >= hacklimit && hostname != "home") {
      listHack.push(hostname)
      //ns.tprint("INFO: HACK -> "+ hostname)
      //if(data.secDiff > minSecDiff){
      //  listSecure.push(hostname)
      //}
    }
    for (var proc of data.procListHost) {
      //ns.tprint(proc);
      var hst = proc["args"][0]
      if (proc["filename"] == "shareThread.js") {
        hst = hostname
      }
      if (hst != undefined) {
        // ns.tprint(hst)
        proc["host"] = hostname
        if (serverMap[hst] != undefined)
          serverMap[hst]["procListTarget"].push(proc)
      }
    }
    //print_obj(data)
  }
  // }
  //ns.tprint("serverlist:")
  //ns.tprint(serverlist)
  //ns.tprint("map:")
  //ns.tprint(map)
  ns.write("servermap.json", JSON.stringify({
    serverMap: serverMap,
    serverInfo: basicData,
    listHack: listHack,
    listImprove: listImprove,
    listSecure: listSecure
  }), "w")

}