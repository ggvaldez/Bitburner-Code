import * as commLib from '/lib/commLib.js'
/** @param {NS} ns */
var ns

function getLinks(serverTree, parent){
var link
  if (serverTree[parent]["links"] == undefined){
      serverTree[parent]["links"] = ns.scan(parent)
  }else{
    for (link of ns.scan(parent)){
        if(!serverTree[parent]["links"].includes(link)){
          serverTree[parent]["links"].push(link)
        }
    }
  }
  for (link of serverTree[parent]["links"]){
    if(serverTree[link] == undefined){
      serverTree[link] = {parent: parent, hops:serverTree[parent]["hops"] + 1}
      getLinks(serverTree, link)
    }else{
      if (serverTree[link]["hops"] > serverTree[parent]["hops"] + 1){
         serverTree[link]["hops"] = serverTree[parent]["hops"] + 1
         serverTree[link]["parent"] = parent
         getLinks(serverTree, link)
      }

    }
  }

}


export async function main(ns2) {
  ns = ns2
  commLib.initialize(ns);
  var serverTree = commLib.getServerTree()
  ns.tprint(JSON.stringify(serverTree))
  if (serverTree == undefined){
      var serverTree = {}
      serverTree["home"] = {parent: undefined, hops: 0}
  }
  
  getLinks(serverTree, "home")
  //ns.tprint(serverTree)
  commLib.setServerTree(serverTree)
  //ns.write("serverTree.json",JSON.stringify(serverTree),"w")
}