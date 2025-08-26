import * as commLib from 'lib/commLib.js'
/** @type import(".").NS */
var ns = null
export async function main(_ns) {
    ns = _ns
    commLib.initialize(ns)
    var contracts = commLib.getContracts()
    for (var contract of contracts) {
        if (contract.type == "Encryption I: Caesar Cipher") solveEncrypt1(contract)
        if (contract.type == "Subarray with Maximum Sum") solveSubarrayMaxSum(contract)
        if (contract.type == "Find Largest Prime Factor") await solveFindPrimeFactor(contract)

    }
}


async function solveFindPrimeFactor(contract) {
    var number = contract.data
    var end = false
    var max_prime = 1
    var divisor = 2
    ns.tprint("input: ",number)
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
    ns.tprint("contrato: " + ns.codingcontract.attempt(max_prime,contract.file,contract.host)) 
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
