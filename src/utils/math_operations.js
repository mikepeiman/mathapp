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

export function generateNewWorksheetProblems() {
    let problems = document.getElementsByClassName('math-problem');
    Object.keys(problems).forEach((i) => {
        let problem = problems[i];
        // console.log(`🚀 ~ file: MathProblem.svelte ~ line 26 ~ Object.keys ~ problem`, problem);
        let inputs = problem.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        // console.log(`🚀 ~ file: MathProblem.svelte ~ line 28 ~ Object.keys ~ inputs`, inputs);
        let values = newRandomValues();
        // let inputs = problem.getElementsByClassName('basic-underline-text-input');

        // Object.keys(inputs).forEach((i) => {
        Array.from(inputs).forEach((input, i) => {
            // console.log(`🚀 ~ file: MathProblem.svelte ~ line 35 ~ Array.from ~ input`, input)
            // inputs.forEach((i) => {
            // console.log(`🚀 ~ file: MathProblem.svelte ~ line 20 ~ onMount ~ problem`, problems[i].value);
            // console.log(`🚀 ~ file: MathProblem.svelte ~ line 39 ~ inputs.forEach ~ i`, i);

            if (input.name !== "result") {
                input.value = values[i]
            } else if (get(showAnswers)) {
                input.value = values[i]
            } else {
                input.value = ''
            }


            input.addEventListener('change', resizeInput);
            input.addEventListener('input', resizeInput);
            resizeInput.call(input);
        });
    });
}

function resizeInput() {
    this.value ? (this.style.width = this.value.length + 2 + 'ch') : (this.style.width = '1ch');
}