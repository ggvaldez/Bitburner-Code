/** @type import(".").NS */
var ns = null;
var threadSize = 2;
var defaultGrowRatio = 0.45;
var defaultHackRatio = 0.1;
var defaultSecRatio = 0.45;
var hackThreadLimit = 50
var nr_runs = 1
var sleepTime = 10500
var hackLimit = 0.4
var endIt = false
var maxSecDiff = 5
async function generateServerMap() {
  await ns.exec("/" + "generateServerMapFile.js", "home")
  await ns.sleep(100)
  var obj = JSON.parse(await ns.read("servermap.json"))
  return obj
}

async function generateFlags() {
  var flags = ns.flags([
    ['kill', true],
    ['share', false],
    ['share-all', false],
    ['loop', true],
    //['wait', false],
    ['end', false]
  ]);
  //  flags['share'] = await ns.prompt("Share Ram?")
  //  if (flags['share']) {
  //    flags['share-all'] = await ns.prompt("Share ALL TEH RAMM?")
  //  }
  //  if (flags['share-all']) {
  //    flags['loop'] = false;
  //  }
  //flags['kill'] = await ns.prompt("Kill Stuff?")
  //flags['loop'] = await ns.prompt("Loop?")
  //if (flags['loop']) {
  //  flags['wait'] = await ns.prompt("Wait first?")
  //}
  return flags
}


export async function main(ns2) {
  // Config Global Vars
  ns = ns2;
  // Start Code
  var flags = await generateFlags();
  if (flags['end']) { endIt = true }
  //const query = "This script will open all ports and nuke all servers available. Do you want to:"
  //var answer = await ns.prompt(query,{
  //  type: "select",
  //  choices: ["Show Info Panels", "Hack and Show", "Just Hack", "Kill and Hack"]
  //});
  var obj = await generateServerMap();
  var serverTime = {}
  serverTime['H'] = {}
  serverTime['G'] = {}
  serverTime['W'] = {}
  for ([hostname, data] of Object.entries(obj.serverMap)) {
    serverTime['H'][hostname] = 0
    serverTime['G'][hostname] = 0
    serverTime['W'][hostname] = 0
  }
  var first_loop = 1;

  while (true) {
   // ns.exec("hacknet-manager.js","home")
    if (!endIt) {
      var myservers = ns.getPurchasedServers()
      var max_server_size = 0
      for (var serv of myservers) {
        if (obj.serverMap[serv].maxRam > max_server_size) {
          max_server_size = obj.serverMap[serv].maxRam
        }
      }
      if (max_server_size == 0) {
        max_server_size = obj.serverMap["home"].maxRam
      }
      //ns.tprint("MAX BOUGHT RAM:" + max_server_size)
      if (ns.purchaseServer("home-0", 1048576)) {
        ns.tprint("MAX BOUGHT RAM:" + 1048576)

      }
    }
    
    var growRatio = defaultGrowRatio;
    var hackRatio = defaultHackRatio;
    var secRatio = defaultSecRatio;
    //dontSleep = false

    //obj = await generateServerMap();
    for ([hostname, data] of Object.entries(obj.serverMap)) {
      if (serverTime['H'][hostname] == undefined) serverTime['H'][hostname] = 0
      if (serverTime['G'][hostname] == undefined) serverTime['G'][hostname] = 0
      if (serverTime['W'][hostname] == undefined) serverTime['W'][hostname] = 0
      serverTime['H'][hostname] -= sleepTime
      serverTime['G'][hostname] -= sleepTime
      serverTime['W'][hostname] -= sleepTime
      ns.print(hostname + "(H): " + serverTime['H'][hostname] / 1000 + "sec")
      ns.print(hostname + "(H): " + serverTime['H'][hostname] / 60000 + "min")
      ns.print(hostname + "(G): " + serverTime['G'][hostname] / 1000 + "sec")
      ns.print(hostname + "(G): " + serverTime['G'][hostname] / 60000 + "min")
      ns.print(hostname + "(W): " + serverTime['W'][hostname] / 1000 + "sec")
      ns.print(hostname + "(W): " + serverTime['W'][hostname] / 60000 + "min")
      if (flags["kill"] && first_loop == 1) {
        ns.killall(hostname);
        data.usedRam = 0;
        data.availableRam = data.maxRam;
      }
    }
    obj = await generateServerMap();


    var threadOpenList = [];
    var threadToRunList = [];
    var hackThreads = 0;
    var openThreads = 0;
    var growThreads = 0;
    var secThreads = 0;
    var hostname, data;
    var hackSelect = ""
    var hackValue = 0
    var growSelect = ""
    var growValue = 0
    var secSelect = ""
    var secValue = 0
    for ([hostname, data] of Object.entries(obj.serverMap)) {
      if (hostname == "home") {
        //data.availableRam -= 4 // folguinha pra homeserver
      }
      //ns.tprint(hostname +  serverTime[hostname])

      if (data.maxMoney != 0 && data.hackLevel <= obj.serverInfo.playerHackLevel) {
        if (data.availableMoney < data.maxMoney && data.secDiff <= maxSecDiff && serverTime['G'][hostname] < 1) {
          var growObj = {
            hostname: hostname,
            threads: Math.ceil(ns.growthAnalyze(hostname, data.maxMoney / Math.max(1, data.availableMoney))),
            type: "growThread.js"
          }
          threadToRunList.push(growObj)
          serverTime['G'][hostname] = ns.getGrowTime(hostname)
        } //else {
        if (data.secDiff > 0 && serverTime['W'][hostname] < 1) {
          var secObj = {
            hostname: hostname,
            threads: Math.ceil(data.secDiff / 0.05),
            type: "secThread.js"
          }
          serverTime['W'][hostname] = ns.getWeakenTime(hostname)
          threadToRunList.push(secObj)
        } //else

      if (data.secDiff <= maxSecDiff && data.availableMoney > (1 - hackLimit) * data.maxMoney && serverTime['H'][hostname] < 1) {
        var totThreads = Math.ceil((1 / ns.hackAnalyze(hostname)) * hackLimit)
        var maxselfThreads = Math.min(Math.floor(data.availableRam / threadSize),totThreads)
        if (maxselfThreads > 0) ns.exec("/lib/" + "hackThread.js", hostname, maxselfThreads, hostname)
        totThreads -= maxselfThreads
        data.availableRam -= maxselfThreads
        var hackObj = {
          hostname: hostname,
          threads: totThreads,
          type: "hackThread.js"
        }
        threadToRunList.push(hackObj)
        serverTime['H'][hostname] = ns.getHackTime(hostname)
      }
      }
    }
    var homeThread
    for ([hostname, data] of Object.entries(obj.serverMap)) {

      var localThreads = Math.floor(data.availableRam / threadSize);
      openThreads += localThreads;
      if (hostname != "home") {
        threadOpenList.push({
          hostname: hostname,
          threads: localThreads
        })
      } else {
        homeThread = { hostname: hostname, threads: localThreads }
      }
    }
    var runThread = undefined
    for ([hostname, data] of Object.entries(obj.serverMap)) {
      if(true){//if(!hostname.includes("hacknet-server")){
        var avoid_loop = 10000
      while (avoid_loop > 0) {
        if(avoid_loop < 3){
          ns.tprint("avoid loop "+ hostname + " " + data + " " + runThread)
          await ns.sleep(1000)
        }
        avoid_loop -= 1      // @ignore infinite
        var hostThread = Math.floor(data.availableRam / threadSize)
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
        if(!ns.exec("/lib/" + runThread.type, hostname, numThreads, runThread.hostname)){
           //ns.tprint("Exec Fail: "," runThread.type: " + runThread.type," hostname: ", hostname," numThreads: ", numThreads," runThread.hostname: ", runThread.hostname)
           //await ns.sleep(1000)
        }
          //hostThread -= runThread
          runThread.threads -= numThreads;
          data.usedRam += threadSize * numThreads;
          data.availableRam -= threadSize * numThreads;
        
      }
      }
    }
    first_loop = 0
    for ([hostname, data] of Object.entries(obj.serverMap)) {
      var shareThreads = Math.floor(data.availableRam / 4)
      if (hostname == "home") {
        shareThreads -= 2
      }
      if (!hostname.includes("hacknet-server") && shareThreads > 0 && ns.exec("/lib/" + "shareThread.js", hostname, shareThreads)) {
        data.usedRam += 4 * shareThreads;
        data.availableRam -= 4 * shareThreads;
      }
    }
    if (!flags['loop']) {
      return;
    }
    await ns.sleep(sleepTime);
  }

}