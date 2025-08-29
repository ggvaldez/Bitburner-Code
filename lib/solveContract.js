import * as commLib from 'lib/commLib.js'
/** @type import(".").NS */
var ns = null
export async function main(_ns) {
    ns = _ns
    commLib.initialize(ns)
    var contracts = commLib.getContracts()
    for (var contract of contracts) {
        //ns.tprint(contract.type)
        switch (contract.type) {
            case "Encryption I: Caesar Cipher": ns.tprint(contract.type); solveEncrypt1(contract)
                break;
            case "Encryption II: Vigenère Cipher":ns.tprint(contract.type); solveEncrypt2(contract)
                break;
            case "Subarray with Maximum Sum":ns.tprint(contract.type); solveSubarrayMaxSum(contract)
                break;
            case "Find Largest Prime Factor":ns.tprint(contract.type); solveFindPrimeFactor(contract)
                break;

            case "Unique Paths in a Grid I":ns.tprint(contract.type); solveUniquePaths1(contract)
                break;
            case "Unique Paths in a Grid II":ns.tprint(contract.type); solveUniquePaths2(contract)
                break;

            case "Algorithmic Stock Trader I":ns.tprint(contract.type); algoStockTrade1(contract)
                break;
            case "Generate IP Addresses":ns.tprint(contract.type); genIPAddress(contract)
                break;
            case "Merge Overlapping Intervals":ns.tprint(contract.type); mergeIntervals(contract)
                break;
        }
    }
}

function mergeIntervals(contract){
    var intervals = contract.data
    intervals.sort((a,b) => a[0] - b[0])
    ns.tprint(contract.data)
    var change = true
    for (var i = intervals.length - 1; i >= 0; i--){
        var deleteI = false
        for(var j = i - 1; j >= 0; j--){
            //ns.tprint(intervals)
            //ns.tprint(i," ", j)
            
            if(intervals[i][0] <= intervals[j][1] && intervals[i][0] >= intervals[j][0] 
                || intervals[i][1] <= intervals[j][1] && intervals[i][1] >= intervals[j][0]){
                intervals[j][0] = Math.min(intervals[i][0],intervals[j][0])
                intervals[j][1] = Math.max(intervals[i][1],intervals[j][1])
                var deleteI = true
            }
        }
        if(deleteI) intervals.splice(i, 1)
    }
    intervals.sort((a,b) => a[0] - b[0])
    ns.tprint(contract.data)
    ns.tprint(ns.codingcontract.attempt(intervals, contract.file, contract.host))

}

function validIPs(block, done, data){
    ns.tprint("CALLED: block: ",block," done: ",done," data: ", data)
    //await ns.sleep(100)
    var num = 3
    if(data[0] == 0 || done.length + data.length + 3 - block > 15 || data.length < 3 - block){
        return []
    }
    if (block == 3) {
        if(data.length <= 3 && data.substring(0,3) <= 255){
        ns.tprint("adding ",done+data," block: ", block)
            return [done+data]
        }else{
        return [] 
        }
    }
    if(data.substring(0,3) > 255){
        return validIPs(block + 1,done+data.substring(0,2)+".",data.substring(2))
        .concat( validIPs(block + 1,done+data.substring(0,1)+".",data.substring(1)))
    }else
       return validIPs(block + 1,done+data.substring(0,3)+".",data.substring(3))
        .concat(validIPs(block + 1,done+data.substring(0,2)+".",data.substring(2)))
        .concat(validIPs(block + 1,done+data.substring(0,1)+".",data.substring(1)))
}

function genIPAddress(contract) {
     var output = validIPs(0,"",contract.data)
     ns.tprint(output)
     ns.tprint(ns.codingcontract.attempt(output, contract.file, contract.host))
}

function algoStockTrade1(contract) {
    var profit = 0
    for (var i = 0; i < contract.data.length; i++) {
        for (var j = 0; j < contract.data.length; j++) {
            if (contract.data[j] - contract.data[i] > profit) {
                profit = contract.data[j] - contract.data[i]
            }
        }
    }
    ns.tprint(profit)
    ns.tprint("Contract: ", ns.codingcontract.attempt(profit, contract.file, contract.host))
}

function solveEncrypt2(contract) {
    ns.tprint(contract.description)
    var input = contract.data[0]
    var keys = contract.data[1].repeat(Math.ceil(contract.data[0].length / contract.data[1].length))
    var output = ""
    ns.tprint("Teste solveEncrypt2()")
    for (var i = 0; i < input.length; i++) {
        var shift = keys.charCodeAt(i) - 'A'.charCodeAt(0)
        var letter = input.charCodeAt(i)
        if (letter == 32) {
            output += " "
            continue
        }
        letter = (letter + shift)
        while (letter < 65) {
            letter = letter + 26
        }
        while (letter > 90) {
            letter = letter - 26
        }
        output += String.fromCharCode(letter)
    }
    ns.tprint("INPUT:", input)
    ns.tprint("KEYS:", keys)
    ns.tprint("OUTPUT:", output)
    ns.tprint(ns.codingcontract.attempt(output, contract.file, contract.host))
}



function solveUniquePaths1(contract) {
    var input = contract.data
    var max_i = contract.data[0]
    var max_j = contract.data[1]
    var dynamicMatrix = []
    var i, j
    for (i = 0; i < max_i; i++) {
        dynamicMatrix.push([])
    }
    ns.tprint("Test Unique Paths I")
    for (i = max_i - 1; i >= 0; i--) {
        for (j = max_j - 1; j >= 0; j--) {
            if (false) { dynamicMatrix[i][j] = 0 }
            else if (i == max_i - 1 && j == max_j - 1) { dynamicMatrix[i][j] = 1 }
            else if (i == max_i - 1) { dynamicMatrix[i][j] = dynamicMatrix[i][j + 1] }
            else if (j == max_j - 1) { dynamicMatrix[i][j] = dynamicMatrix[i + 1][j] }
            else { dynamicMatrix[i][j] = dynamicMatrix[i + 1][j] + dynamicMatrix[i][j + 1] }
        }
    }
    for (i = 0; i < max_i; i++) {
        ns.tprint(dynamicMatrix[i])
    }
    var output = dynamicMatrix[0][0]
    ns.tprint("Output:" + output)
    ns.tprint("contrato: " + ns.codingcontract.attempt(output, contract.file, contract.host))
}



function solveUniquePaths2(contract) {
    var input = contract.data
    var max_i = contract.data.length
    var max_j = contract.data[0].length
    var dynamicMatrix = []
    var i, j
    for (i = 0; i < max_i; i++) {
        dynamicMatrix.push([])
    }

    for (i = max_i - 1; i >= 0; i--) {
        for (j = max_j - 1; j >= 0; j--) {
            if (input[i][j] == 1) { dynamicMatrix[i][j] = 0 }
            else if (i == max_i - 1 && j == max_j - 1) { dynamicMatrix[i][j] = 1 }
            else if (i == max_i - 1) { dynamicMatrix[i][j] = dynamicMatrix[i][j + 1] }
            else if (j == max_j - 1) { dynamicMatrix[i][j] = dynamicMatrix[i + 1][j] }
            else { dynamicMatrix[i][j] = dynamicMatrix[i + 1][j] + dynamicMatrix[i][j + 1] }
        }
    }
    for (i = 0; i < max_i; i++) {
        ns.tprint(dynamicMatrix[i])
    }
    var output = dynamicMatrix[0][0]
    ns.tprint("Output:" + output)
    ns.tprint("contrato: " + ns.codingcontract.attempt(output, contract.file, contract.host))
}



async function solveFindPrimeFactor(contract) {
    var number = contract.data
    var end = false
    var max_prime = 1
    var divisor = 2
    ns.tprint("input: ", number)
    while (true) {
        //await ns.sleep(100)
        if ((number % divisor) != 0) {
            divisor += 1
        } else {
            if (divisor >= number) {
                if (divisor > max_prime) {

                    max_prime = divisor
                }
                break
            }
            if (divisor > max_prime) {
                max_prime = divisor
            }
            number = number / divisor
            divisor = 2
        }
    }
    ns.tprint("Output:" + max_prime)
    ns.tprint("contrato: " + ns.codingcontract.attempt(max_prime, contract.file, contract.host))
}


function solveSubarrayMaxSum(contract) {
    var input = contract.data
    var max = { num: -100000, array }
    var sum = 0
    var array = []
    ns.tprint("Input:" + input)
    for (var i = 0; i < input.length; i++) {
        for (var j = i; j < input.length; j++) {
            sum = 0
            array = []
            for (var k = i; k <= j; k++) { sum += input[k]; array.push(input[k]) }

            if (sum > max.num) {
                max = { num: sum, array: array }
                ns.tprint("Parcial: " + max.num + "  " + max.array)
            }
        }
    }
    var output = max.num
    ns.tprint("Output:" + output)
    ns.tprint("contrato: " + ns.codingcontract.attempt(output, contract.file, contract.host))
}
function solveEncrypt1(contract) {
    contract.data[0]
    var input = contract.data[0]
    var output = ""
    var shift = - contract.data[1]
    for (var i = 0; i < input.length; i++) {

        var letter = input.charCodeAt(i)
        if (letter == 32) {
            output += " "
            continue
        }
        letter = (letter + shift)
        while (letter < 65) {
            letter = letter + 26
        }
        while (letter > 90) {
            letter = letter - 26
        }
        output += String.fromCharCode(letter)
    }
    ns.tprint(input)
    ns.tprint(output)
    ns.tprint(ns.codingcontract.attempt(output, contract.file, contract.host))
}
