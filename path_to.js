/** @param {NS} ns */

export async function main(ns) {
  //var search = await ns.prompt("What server are you looking for?",
  //  {
  //    type: "text"
  //  })
  var index = -1;
  var serverlist = new Map()
  serverlist.set("home", {path: "home" });
  var old_size = 0
  while (serverlist.size > old_size) {
    // ns.tprint("pasasd")
    old_size = serverlist.size;
    var key, path
    for ([key, _] of serverlist) {
      for (const new_name of ns.scan(key)) {
        if (!serverlist.has(new_name)) {
          path = serverlist.get(key)["path"]
          if(ns.getServer(new_name)["backdoorInstalled"]){
            path = "BACKDOOR"
          }

          serverlist.set(new_name, 
          {
            path: path + " > " + new_name ,
            lvl: ns.getServerRequiredHackingLevel(new_name),
            ports: ns.getServerNumPortsRequired(new_name)
          });
        }
      }
    }
  }
  var sorted = Array.from(serverlist.entries())
  sorted.sort((a, b) => b[1]["lvl"] - a[1]["lvl"])
  var data
  for ([key,data] of sorted){
    //if(ns.hasRootAccess(key) && data.lvl < ns.getHackingLevel()){
    //  continue;
    //}
    ns.tprint(key)
    ns.tprint("HackLvl: " + serverlist.get(key)["lvl"]+ " | Ports: " + serverlist.get(key)["ports"]
    +" | backdoor: " + ns.getServer(key)["backdoorInstalled"])
    ns.tprint(serverlist.get(key)["path"])
  }
  
  var args
  if (ns.args.length > 0) {
    args = ns.args
  } else {
    args = ["CSEC", "avmnite-02h", "I.I.I.I","run4theh111z","."]
  }
  for (key of args) {
    ns.tprint("-------------------------")
    ns.tprint(key)
    ns.tprint("HackLvl: " + serverlist.get(key)["lvl"])
    ns.tprint("Ports: " + serverlist.get(key)["ports"])
    ns.tprint("-------------------------")
    ns.tprint(serverlist.get(key)["path"])
    ns.tprint("-------------------------")
  }
}