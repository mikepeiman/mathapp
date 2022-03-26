import { digitsA, digitsB, result, selectedOperation, valueA, valueB } from '$stores/math.js'
import { get } from 'svelte/store'

let dA = get(digitsA)
let dB = get(digitsB)
let vA = get(valueA)
let vB = get(valueB)
let sO = get(selectedOperation)
let res = get(result)


export function processCalculation() {
    vA = get(valueA)
    vB = get(valueB)
    sO = get(selectedOperation)
    console.log(`🚀 ~ file: math_operations.js ~ line 12 ~ processCalculation ~ sO`, sO)
    res = eval(`${vA} ${sO.symbol} ${vB}`);
    console.log(`🚀 ~ file: math_operations.js ~ line 12 ~ processCalculation ~ ${vA} ${sO.symbol} ${vB}`)
    sO.name === 'Divide' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    return res;
}

export function setDivisionPrecision(res) {
    res.toFixed(3);
    vA % vB === 0 ? res : (res = res.toFixed(3));
    console.log(`🚀 ~ file: math_operations.js ~ line 25 ~ setDivisionPrecision ~ res`, res)
    // result.set(res)
    return res;
}

export function newRandomValues() {
    // valueA = Math.ceil(Math.random() * Math.pow(10, digitsA));
    dA = get(digitsA)
    dB = get(digitsB)
    vA = (Math.ceil(Math.random() * Math.pow(10, dA)))
    vB = Math.ceil(Math.random() * Math.pow(10, dB));
    // console.log(`🚀 ~ file: math_operations.js ~ line 25 ~ newRandomValues ~ vA ${vA}, vB ${vB}, dA ${dA}, dB ${dB} `)
    valueA.set(vA);
    valueB.set(vB);
    // console.log(`🚀 ~ file: math_operations.js ~ line 27 ~ newRandomValues ~ sO`, sO)
    res = eval(`${vA} ${sO.symbol} ${vB}`);
    // console.log(`🚀 ~ file: math_operations.js ~ line 39 ~ newRandomValues ~ res`, res)
    sO.name === 'Divide' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    // console.log(`🚀 ~ file: math_operations.js ~ line 30 ~ newRandomValues ~ res`, res)
    return [vA, vB, res];
}