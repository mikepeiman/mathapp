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
    res = eval(`${vA} ${sO.symbol} ${vB}`);
    sO.name === 'Divide' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    return res;
}

export function setDivisionPrecision(res) {
    res.toFixed(3);
    vA % vB === 0 ? res : (res = res.toFixed(3));
    return res;
}

export function newRandomValues() {
    dA = get(digitsA)
    dB = get(digitsB)
    vA = randomIntegerRange(Math.pow(10, dA - 1), Math.pow(10, dA), dA)
    vB = randomIntegerRange(Math.pow(10, dB - 1), Math.pow(10, dB), dB)
    valueA.set(vA);
    valueB.set(vB);
    res = eval(`${vA} ${sO.symbol} ${vB}`);
    sO.name === 'Divide' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    return [vA, vB, res];
}

function randomIntegerRange(min, max, digits) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min ;
    return num.toString().length > digits ? --num : num;
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
            input.value = values[i] 
            input.setAttribute("data-value", values[i])
            // the following conditionally fills results or not depending on toggle; moving this logic to resize function
            // if (input.name !== "result") {
            //     input.value = values[i]
            // } else if (get(showAnswers)) {
            //     input.value = values[i]
            // } else {
            //     input.value = ''
            // }
        });
    });
}

export function resizeAllInputs() {
    let problems = document.getElementsByClassName('math-problem');
    let show = get(showAnswers);
    Object.keys(problems).forEach((i) => {
        let problem = problems[i];
        let inputs = problem.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        Array.from(inputs).forEach((input, i) => {
            input.value ? (input.style.width = input.value.length + 2 + 'ch') : (input.style.width = '1ch');
            if(input.name === "result"){
                show ? input.value = input.getAttribute('data-value') : input.value = '';
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