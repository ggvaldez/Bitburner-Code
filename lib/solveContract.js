import * as commLib from 'lib/commLib.js'
/** @type import(".").NS */
var ns = null
export async function main(_ns) {
    ns = _ns
    commLib.initialize(ns)
    var contracts = commLib.getContracts()
    for (var contract of contracts) {
        switch (contract.type) {
            case "Encryption I: Caesar Cipher": solveEncrypt1(contract)
            case "Encryption II: Vigenère Cipher": solveTotalWaystoSum(contract)
            case "Subarray with Maximum Sum": solveSubarrayMaxSum(contract)
            case "Find Largest Prime Factor": solveFindPrimeFactor(contract)
            case "Unique Paths in a Grid I": solveUniquePaths1(contract)
            case "Unique Paths in a Grid II": solveUniquePaths2(contract)
            case "Total Ways to Sum": solveTotalWaystoSum(contract)
            case "Algorithmic Stock Trader I": solveTotalWaystoSum(contract)
        }
    }
}

function algoStockTrade1(){
    profit = 0
    for(var i = 0; i < data.length;i++){
        for(var j = 0; j < data.length;j++){
            if(data[j] - data[i] > profit){
                profit = data[j] - data[i]
            }
        }
    }
    ns.tprint("Test algoStockTrade1()")
    ns.tprint(i," ",j)
    navigator.tprint(profit)
    
    //ns.tprint(ns.codingcontract.attempt(profit, contract.file, contract.host))
}

function solveEncrypt2(contract) {
    contract.data[0]
    var input = contract.data[0]
    var keys = contract.data[1].repeat(Math.ceil(contract.data[0].length/contract.data[1].length))
    var output = ""
    ns.tprint = ns.tprint("Teste solveEncrypt2()")
    for (var i = 0; i < input.length; i++) {
        var shift = contract.data[1].charCodeAt(i) - 'A'.charCodeAt(0)
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
    ns.tprint("OUTPUT:",output)
    //ns.tprint(ns.codingcontract.attempt(output, contract.file, contract.host))
}


function solveTotalWaystoSum(contract) {

    var input = contract.data
    var count = 0
    var work_array = [input]
    var pointer = 0
    ns.tprint("Test solveTotalWaystoSum()")
    while (pointer >= 0) {
        if (work_array[pointer] == 1) {
            pointer--
        } else {
            work_array[pointer] = work_array[pointer] - 1
            work_array[pointer + 1] = input - work_array[0]
            count++
            pointer++
        }
        ns.tprint(work_array, count)
    }
    ns.tprint("Output:" + output)
    //ns.tprint("contrato: " + ns.codingcontract.attempt(output, contract.file, contract.host))
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
    //ns.tprint("contrato: " + ns.codingcontract.attempt(output, contract.file, contract.host))
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
