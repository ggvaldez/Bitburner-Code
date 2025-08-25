//TODO: FULL RE-WRITE THIS MESS

/** @param {NS} ns */
var ns
const colorCyan = "\x1b[36m"
const colorYellow = "\x1b[33m"
const colorPink = "\x1b[35m"
const colorWhite = "\x1b[37m"
const colorRed = "\x1b[31m"
const colorReset = "\u001b[0m";
const colorGreen = "\x1b[38;5;3m"
const colorBlueGreen = "\x1b[38;5;6m"
const defaultItemSize = 30
const defaultCols = 4
const alertSec = 5
const colorlist = [colorCyan,colorYellow,colorPink,colorWhite,colorRed,colorReset,colorGreen,colorBlueGreen]
async function generateServerMap() {
  await ns.exec("generateServerMapFile.js", "home")
  await ns.sleep(100)
  var obj = JSON.parse(await ns.read("servermap.json"))
  return obj
}

function colorize(string, color, reset = colorReset) {
  if (color != undefined) {
    return color + string + reset
  } else {
    return reset + string
  }
}
function printSimpleMatrix(matrix, num_cols = defaultCols, num_lines, color = colorReset, endline = true, itemSize = defaultItemSize) {
  var new_matrix = [];
  for (var arr of matrix) {
    var line = []
    for (var item of arr) {
      line.push({ text: item, color: color, spanSize: 1 })
    }
    new_matrix.push(line)
  }
  return printMatrix(new_matrix, num_cols, num_lines, color, endline, itemSize)
}
function printLine(itemSize = defaultItemSize, num_cols = defaultCols){
  ns.tprint("-".repeat((itemSize + 3) * num_cols + 1))
}

function printMatrix(matrix, num_cols = defaultCols, num_lines, color = colorReset, endline = true, itemSize = defaultItemSize) {
  var line = "-".repeat((itemSize + 3) * num_cols + 1)
  line = colorize(line, color, color)
  ns.tprint(line);
  //var real_cols = 0
  for (var arr of matrix) {

    var toPrint = colorize("|", color, color)
    for (var item of arr) {
      //real_cols = 0
      if (item.colSpan == 0) {
        continue;
      }
      var toAdd = String(item.text);
      var spanSize = itemSize
      if (item.colSpan > 1) {
        var spanSize = item.colSpan * (itemSize + 3) - 3
        //real_cols += item.colSpan
      }//else{
      //  real_cols += 1
      //}
      if (!toAdd.includes("\x1b")) {
        toAdd = toAdd.substring(0, spanSize)
      }
      if (item.pad == "L") {
        toAdd = String(toAdd).padEnd(spanSize, " ")
      } else if (item.pad == "R") {
        toAdd = String(toAdd).padStart(spanSize, " ")
      } else {
        var calc_start = Math.floor(((spanSize) - toAdd.length) / 2)
        var calc_end = Math.ceil(((spanSize) - toAdd.length) / 2)
        toAdd = " ".repeat(calc_start) + toAdd + " ".repeat(calc_end)
      }
      toAdd = colorize(toAdd, item.color, color)
      toPrint += " " + toAdd
      //ns.tprint(item.text + " " +item.box)
      if (item.box == "Only Left" || item.box == "None") {
        toPrint += "  "
      } else {
        toPrint += " |"
      }
    }
    //var printnocolor = " " + toPrint
    //for (color of colorlist){
    //    printnocolor.replace(color,"")
    //}
    //if(real_cols < num_cols){
    //  toPrint += " ".repeat( itemSize * (num_cols - real_cols )) + "|"
     // ns.tprint(real_cols, "R F",num_cols)
    //;}
    ns.tprint(toPrint)
  }
  if (endline) {
    ns.tprint(line);
  }

}
function print_title(string, num_cols, color = colorCyan, endline = true, itemSize = defaultItemSize) {
  var item = { text: string, colSpan: num_cols }
  printMatrix([[item]], num_cols, 1, color, endline, itemSize)

}

function print_obj_array(array, excludeKeys = [], colorKey, color, columnBreak = 1, itemSize = defaultItemSize) {
  var data_matrix = []
  var line = []
  var num_cols = 0
  var num_lines = 1
  var count = 0;
  for (var i = 0; i < columnBreak; i++) {
    for (const key in array[0]) {
      if (excludeKeys.includes(key)) {
        continue;
      }
      line.push({ text: key, color: colorKey[key] })
      num_cols += 1
    }
  }
  data_matrix.push(line)
  printMatrix(data_matrix, num_cols, num_lines, color, false,itemSize)
  data_matrix = []
  line = []
  for (const obj of array) {
    count = count + 1;
    for (const key in obj) {
      if (excludeKeys.includes(key)) {
        continue;
      }
      line.push({ text: obj[key], color: colorKey[key] })
    }
    if (count == columnBreak) {
      data_matrix.push(line)
      num_lines += 1
      count = 0
      line = []
    }
  }
  if (count != 0) {
    data_matrix.push(line)
    num_lines += 1
  }
  printMatrix(data_matrix, num_cols, num_lines, color,true,itemSize)
}

function sort_obj_list(a, b) {
  var dataA = a[1]
  var dataB = a[1]
  var hostA = a[0]
  var hostB = a[0]
  return a[0] - b[0]
}

export async function main(ns2) {
  ns = ns2
  var obj = await generateServerMap();
  let formatterDE = new Intl.NumberFormat('de-DE');
  var data = obj.serverInfo
  if (data.totalSecDiff > 3 * alertSec) {
    var secColor = colorRed;
  }
  var moneyPercent = Math.round(data.totalAvailableMoney * 10000 / data.totalMaxMoney) / 100 + `%`

  var data_matrix =
    [[{ text: "Total Money:", pad: "L", box: "Only Left", color: colorYellow }, { text: moneyPercent, pad: "R", color: colorYellow },
    { text: "Security", color: secColor, box: "Only Left", pad: "L" },
    { text: "" }],
    [{ text: formatterDE.format(data.totalAvailableMoney) + " / " + formatterDE.format(data.totalMaxMoney), pad: "R", colSpan: 2, color: colorYellow },
    { text: "TotalSecDiff:", box: "Only Left", pad: "L", color: secColor },
    { text: "          " + data.totalSecDiff, color: secColor, pad: "R" }]]
  printMatrix(data_matrix, 4, 2, furnitureColor)

  var print_list = []
  for (var i = 0; i < obj.listHack.length && i < obj.listImprove.length && i < obj.listSec; i++) {
    var hackItem = ""
    var improveItem = ""
    var secItem = ""
    if (i < obj.listHack.length) {
      hackItem = obj.listHack[i]
    }
    if (i < obj.listImprove.length) {
      improveItem = obj.listImprove[i]
    }
    if (i < obj.listSec.length) {
      secItem = obj.listSec[i]
    }
    print_list.push({ IMPROVE: improveItem, HACK: hackItem, SEC: secItem })
  }
  print_obj_array(print_list, [], {}, "", 1)


  var others = []
  var obj;
  var hostname
  var listServerMaps = []
  for ([hostname, data] of Object.entries(obj.serverMap)) {
    listServerMaps.push(hostname)
  }
  //listServerMaps.sort();
  for (hostname of listServerMaps) {
    data = obj.serverMap[hostname]
    var furnitureColor = colorCyan
    secColor = undefined
    if (data.secDiff > alertSec) {
      var secColor = colorRed;
    }

    moneyPercent = ""

    if (data.maxMoney > 0) {
      moneyPercent = Math.round(data.availableMoney * 10000 / data.maxMoney) / 100 + `%`
    }
    var ram1 = data.usedRam
    var ram2 = data.maxRam
    var ramAdd = ""
    if(data.maxRam > 1024){
    ram1 = (Math.round(data.usedRam / 1024)) + "T"
    ram2 = (Math.round(data.maxRam / 1024)) + "T"
    }else{
      ram1 += "G"
      ram2 += "G"
    }
    if(data.maxMoney != 0){
      ramAdd = "RAM: "
    }
    var ram = ramAdd + ram1 + " / " + ram2
    
    if (data.maxRam == 0) {
      ram = "NO RAM"
    }
    var moneyPercentTotal = Math.ceil(data.maxMoney * 1000 / obj.serverInfo.totalMaxMoney) / 100
    var growthPercent = Math.ceil(data.maxMoney * data.serverGrowth * 1000 / obj.serverInfo.totalGrowthMoney) / 100
    
    
    var new_proc = {}
    new_proc["shareThread.js"] = new_proc["hackThread.js"] = new_proc["growThread.js"] = new_proc["secThread.js"] = 0
    for (var proc of data.procListTarget) {
      new_proc[proc["filename"]] += proc["threads"]
    }


    var proctypes = 0
    var procAdd = "No Proc Running"
    new_proc["No Proc Running"] = 0
    /*
    new_proc["shareColor"] = colorReset
    new_proc["hackColor"] = colorReset
    new_proc["growColor"] = colorReset
    new_proc["secColor"] = colorReset
    if (new_proc["shareThread.js"] == 0) new_proc["shareColor"] = colorBlueGreen; else {proctypes += 1; procAdd = "shareThread.js"};
    if (new_proc["hackThread.js"] == 0) new_proc["hackColor"] = colorBlueGreen; else {proctypes += 1; procAdd = "hackThread.js"};
    if (new_proc["growThread.js"] == 0) new_proc["growColor"] = colorBlueGreen; else {proctypes += 1; procAdd = "growThread.js"};
    if (new_proc["secThread.js"] == 0) new_proc["secColor"] = colorBlueGreen; else {proctypes += 1; procAdd = "secThread.js"};
    procAdd = procAdd+": "+new_proc[procAdd]
    if(proctypes != 1){
      procAdd = ""
    }*/
    new_proc["color"] = colorBlueGreen 
    new_proc["extra"] = ""
    for (var option of ["hackThread.js","growThread.js","secThread.js", "shareThread.js"]){
     if(new_proc[option] != 0 ){
      if(procAdd == "No Proc Running") procAdd = option;
      else /*if(option!= "shareThread.js")*/ new_proc["extra"] += ", " + option.replace("Thread.js","")+ ": " + new_proc[option]
     } 
     

    }
    if (procAdd != "No Proc Running"){
      procAdd = procAdd.replace("Thread.js","") + ": " + new_proc[procAdd] +new_proc["extra"]

      new_proc["color"] = colorReset
    }
    if(hostname == "n00dles") {
      printLine()
      ns.tprint(" ")
    }
    data_matrix = [[
      { text: hostname.toUpperCase(), colSpan: 1, color: colorRed},
      { text: "Grow:" + " " + data.serverGrowth + " | " + "Grow %: " + growthPercent + "%", 
                                            color: colorPink, pad: "L", colSpan: 1 }, 

      { text: procAdd, colSpan: 1, color: new_proc["color"]},
      { text: ram, color: colorReset }
    ]]


    if (data.maxMoney != 0) {
    printMatrix(data_matrix, 4, 1, furnitureColor, false)
    } else {
    //print_obj_array(data_matrix[0])
      others.push({ SERVER: hostname.toUpperCase(), RAM: ram, PROCESSES: procAdd })
    }

    //print_title(hostname, 5, furnitureColor, false);
    if (data.maxMoney != 0) {
      data_matrix =
        [[{ text: "Money:", pad: "L", box: "Only Left", color: colorYellow }, { text: "Server: " + moneyPercent + " All: " + moneyPercentTotal + "%", pad: "R", color: colorYellow },
        { text: "Security", color: secColor, box: "Only Left", pad: "L" },
        { text: "Diff:      " + data.secDiff, color: secColor, pad: "L" }],
        [{ text: formatterDE.format(data.availableMoney) + " / " + formatterDE.format(data.maxMoney), pad: "R", colSpan: 2, color: colorYellow },
        { text: "Lvl:      " + data.secLevel, color: secColor, box: "Only Left", pad: "L" },
        { text: "Min:       " + data.secMin, color: secColor, pad: "L" }]]
      printMatrix(data_matrix, 4, 2, furnitureColor, true)
    ns.tprint(" ")
    }


    //if (data.procListHost.length != 0) {
    //  print_obj_array(data.procListHost, ['pid','temporary'],"NO LOCAL PROCS of " + hostname + " !", false)
    //}

    //if (data.procListTarget.length != 0) {
/*
    data_matrix = [[
      { text: "shareThread.js: " + new_proc["shareThread.js"], color: new_proc["shareColor"] }
      , { text: "hackThread.js: " + new_proc["hackThread.js"], color: new_proc["hackColor"] }
      , { text: "growThread.js: " + new_proc["growThread.js"], color: new_proc["growColor"] }
      , { text: "secThread.js: " + new_proc["secThread.js"], color: new_proc["secColor"] }
    ]]
    //print_obj_array(data.procListTarget, ['pid', 'temporary'],{},colorBlueGreen)
    //if (proctypes > 1)
      printMatrix(data_matrix, 4, 1, furnitureColor)
    //}*/


  }
  //print_obj_array(others, [], { Server: colorCyan, RAM: colorReset }, colorCyan,2)
  //print_title("OTHER SERVERS")
  print_obj_array(others,[],colorRed,colorCyan,2,20)

  var maxRam = await ns.getPurchasedServerMaxRam()
  var array = []
  for (i = maxRam; i > 2; i = i / 2) {
    array.push(
      {
        Ram: i,
        Cost: formatterDE.format(ns.getPurchasedServerCost(i))
      }
    )
  }
  print_obj_array(array, [], { Server: colorCyan, RAM: colorReset }, colorCyan, 2)

  ns.tprint(ns.hacknet.getHashUpgrades())
  while(ns.hacknet.numHashes() > 5){
      ns.hacknet.spendHashes("Sell for Money")
  }
  

  //ns.purchaseServer("home-0", 1048576)
}