import { digitsA, digitsB, result, selectedOperation, valueA, valueB, showAnswers, pageColumns, problemsPerPage, worksheet } from '$stores/math.js'
import { get } from 'svelte/store'

let dA = get(digitsA)
let dB = get(digitsB)
let vA = get(valueA)
let vB = get(valueB)
let sO = get(selectedOperation)
let res = get(result)
let longest = 0

export function processCalculation() {
    vA = get(valueA)
    vB = get(valueB)
    sO = get(selectedOperation)
    res = eval(`${vA} ${sO.symbol} ${vB}`);
    sO.name === 'Divide' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    return res;
}
export function processCalculation2(inputs) {
    vA = inputs[0].getAttribute('data-value')
    vB = inputs[1].getAttribute('data-value')
    sO = get(selectedOperation)
    res = eval(`${vA} ${sO.symbol} ${vB}`);
    sO.name === 'Divide' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    return res;
}

export function recalculateProblems() {
    let problemsElements = document.getElementsByClassName('math-problem');
    let show = get(showAnswers);
    Object.keys(problemsElements).forEach((i) => {
        let problemEl = problemsElements[i];
        let inputs = problemEl.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        let inputsArray = Array.from(inputs)
        let res = processCalculation2(inputsArray);
        inputsArray.forEach((input, i) => {
            input.value ? (input.style.width = input.value.length + 2 + 'ch') : (input.style.width = '1ch');
            if(input.name === "result"){
                input.setAttribute('data-value', res);
                show ? input.value = res : input.value = '';
            }
            resizeInput.call(input);
        });
    });
}

export function setDivisionPrecision(res) {
    res.toFixed(3);
    vA % vB === 0 ? res : (res = res.toFixed(3));
    return res;
}

export function newRandomValues() {
    dA = get(digitsA)
    dB = get(digitsB)
    sO = get(selectedOperation)
    vA = randomIntegerRange(Math.pow(10, dA - 1), Math.pow(10, dA), dA)
    vB = randomIntegerRange(Math.pow(10, dB - 1), Math.pow(10, dB), dB)
    valueA.set(vA);
    valueB.set(vB);
    // console.log(`🚀 ~ file: math_operations.js ~ line 66 ~ newRandomValues ~ ${vA} ${sO.symbol} ${vB}`)
    res = eval(`${vA} ${sO.symbol} ${vB}`);
    sO.name === 'Divide' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    return [vA, vB, res];
}

function randomIntegerRange(min, max, digits) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min ;
    return num.toString().length > digits ? --num : num;
}

export function setWorksheetValuesToDOM(sheet) {
    console.log(`🚀 ~ file: math_operations.js ~ line 79 ~ setWorksheetValuesToDOM ~ sheet`, sheet)
    let problemsElements = document.getElementsByClassName('math-problem');
    Object.keys(problemsElements).forEach((i) => {
        let problemEl = problemsElements[i];
        console.log(`🚀 ~ file: math_operations.js ~ line 83 ~ Object.keys ~ problemEl`, problemEl)
        let inputs = problemEl.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        let problem = sheet.problems[i];
        let values = []
        Object.values(problem).forEach((value, i) => {
        console.log(`🚀 ~ file: math_operations.js ~ line 89 ~ Object.problems ~ problem, i`, problem, i)
        values.push(value);
        })
        Array.from(inputs).forEach((input, j) => {
            console.log(`🚀 ~ file: math_operations.js ~ line 88 ~ Array.from ~ input #${j}`, input)
            input.value = values[j] 
            input.setAttribute("data-value", values[j])
        });
    });
    // return worksheet
}
export function generateNewWorksheetValues() {
    let problem = {}, problems = [], sheet = {}, numProblems = get(problemsPerPage)
    console.log(`🚀 ~ file: math_operations.js ~ line 114 ~ generateNewWorksheetValues ~ numProblems`, numProblems)
    for(let i = 0; i < numProblems; i++){
        let values = newRandomValues();
                problem = {
            valueA: values[0],
            valueB: values[1],
            result: values[2],
        }
        problems.push(problem);
    }
    let columns = get(pageColumns)
    sheet['problems'] = problems;
    sheet['columns'] = columns;
    worksheet.set(sheet);
    console.log(`🚀 ~ file: math_operations.js ~ line 128 ~ newworksheet setWorksheetValuesToDOM ~ worksheet`, sheet)
    setWorksheetValuesToDOM(sheet);
    return sheet
}

export function resizeAllInputs() {
    let problemsElements = document.getElementsByClassName('math-problem');
    let show = get(showAnswers);
    Object.keys(problemsElements).forEach((i) => {
        let problemEl = problemsElements[i];
        let inputs = problemEl.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        Array.from(inputs).forEach((input, i) => {
            // input.value ? (input.style.width = input.value.length + 2 + 'ch') : (input.style.width = '1ch');
            // if(input.name === "result"){
            //     show ? input.value = input.getAttribute('data-value') : input.value = '';
            // }
            input.addEventListener('change', resizeInput);
            input.addEventListener('input', resizeInput);
            resizeInput.call(input);
        });
    });
}

function resizeInput() {
    dA = get(digitsA)
    dB = get(digitsB)
    let show = get(showAnswers);
    this.getAttribute('data-value') ? (this.style.width = this.getAttribute('data-value').length + 2 + 'ch') : (this.style.width = dA + dB + 1 + 'ch');
    // (this.style.width = dA + dB + 1 + 'ch')
    let thisLength = this.value.length;
    thisLength > longest ? longest = thisLength : longest;
    // console.log(`🚀 ~ file: math_operations.js ~ line 127 ~ resizeInput ~ longest`, longest)
    if(this.name === "result"){
        show ? this.value = this.getAttribute('data-value') : this.value = ' ';
    } 
}