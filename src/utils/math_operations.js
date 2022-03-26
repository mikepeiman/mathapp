import { digitsA, digitsB, result, selectedOperation, valueA, valueB, showAnswers } from '$stores/math.js'
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
    // vA = (Math.ceil(Math.random() * Math.pow(10, dA)))
    vA = randomIntegerRange(Math.pow(10, dA - 1), Math.pow(10, dA))
    vB = randomIntegerRange(Math.pow(10, dB - 1), Math.pow(10, dB))
    // vB = Math.ceil(Math.random() * Math.pow(10, dB));
    vA.length > dA ? vA-- : vA;
    vB.length > dB ? vB-- : vB;
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

function randomIntegerRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min - 1;
}

export function generateNewWorksheetProblems() {
    let problems = document.getElementsByClassName('math-problem');
    Object.keys(problems).forEach((i) => {
        let problem = problems[i];
        let inputs = problem.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        let values = newRandomValues();
        Array.from(inputs).forEach((input, i) => {
            if (input.name !== "result") {
                input.value = values[i]
            } else if (get(showAnswers)) {
                input.value = values[i]
            } else {
                input.value = ''
            }

            // resizeInput.call(input);
        });
    });
}

export function resizeAllInputs() {
    let problems = document.getElementsByClassName('math-problem');
    Object.keys(problems).forEach((i) => {
        let problem = problems[i];
        let inputs = problem.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        Array.from(inputs).forEach((input, i) => {
            input.value ? (input.style.width = input.value.length + 2 + 'ch') : (input.style.width = '1ch');
            input.addEventListener('change', resizeInput);
            input.addEventListener('input', resizeInput);
        });
    });
}

function resizeInput() {
    this.value ? (this.style.width = this.value.length + 2 + 'ch') : (this.style.width = '1ch');
}