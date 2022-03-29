import { digitsA, digitsB, result, selectedOperation, valueA, valueB, showAnswers, pageColumns, problemsPerPage, worksheet, randomizeOperations } from '$stores/math.js'
import { setWorksheetValuesToDOM, resizeAllInputs, resizeInput } from './dom_operations';
import { get } from 'svelte/store'
import { v4 as uuidv4 } from 'uuid';
let dA = get(digitsA)
let dB = get(digitsB)
let vA = get(valueA)
let vB = get(valueB)
let sO = get(selectedOperation)
let res = get(result)
let longest = 0
let operations = [
    {
        name: 'Multiply',
        symbol: '*',
        iconname: 'fa-solid:times'
    },
    {
        name: 'Subtract',
        symbol: '-',
        iconname: 'fa-solid:minus'
    },
    {
        name: 'Add',
        symbol: '+',
        iconname: 'fa-solid:plus'
    },
    {
        name: 'Divide',
        symbol: '/',
        iconname: 'fa-solid:divide'
    },
];

export function processCalculation(a, b, operation) {
    res = eval(`${a} ${operation.symbol} ${b}`);
    operation.name === 'Divide' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    return res;
}
export function processCalculationFromAttributes(inputs) {
    vA = inputs[0].getAttribute('data-value')
    vB = inputs[1].getAttribute('data-value')
    sO = get(selectedOperation)
    res = eval(`${vA} ${sO.symbol} ${vB}`);
    sO.name === 'Divide' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    return res;
}
export function processCalculationFromValues(inputs) {
    vA = inputs[0].value
    vB = inputs[1].value
    sO = get(selectedOperation)
    res = eval(`${vA} ${sO.symbol} ${vB}`);
    sO.name === 'Divide' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    return res;
}

export function recalculateProblems() {
    let sheet = get(worksheet)
    let problems = sheet.problems
    let op = get(selectedOperation)
    console.log(`🚀 ~ file: math_operations.js ~ line 63 ~ recalculateProblems ~ problems`, problems)
    problems.forEach(problem => {
        console.log(`🚀 ~ file: math_operations.js ~ line 65 ~ recalculateProblems ~ problem`, problem)
        problem.op = op
        problem.result = processCalculation(problem.valueA, problem.valueB, op)
    })
    sheet.problems = problems
    worksheet.set(sheet)
    let problemsElements = document.getElementsByClassName('math-problem');
    let show = get(showAnswers);
    Object.keys(problemsElements).forEach((i) => {
        let problemEl = problemsElements[i];
        let inputs = problemEl.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        let inputsArray = Array.from(inputs)
        // let res = processCalculationFromAttributes(inputsArray);
        let res = processCalculationFromValues(inputsArray);
        inputsArray.forEach((input, i) => {
            input.value ? (input.style.width = input.value.length + 2 + 'ch') : (input.style.width = '1ch');
            if (input.name === "result") {
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
    let randomize = get(randomizeOperations)
    // get random operation
    let randomOperation = operations[Math.floor(Math.random() * operations.length)];

    // console.log(`🚀 ~ file: math_operations.js ~ line 63 ~ newRandomValues ~ sO`, sO)
    if (!sO.length) {
        sO = operations[0];
        // console.log(`🚀 ~ file: math_operations.js ~ line 100 ~ newRandomValues ~ sO`, sO)
        selectedOperation.set(sO);
    }
    randomize ? sO = randomOperation : sO = sO;
    vA = randomIntegerRange(Math.pow(10, dA - 1), Math.pow(10, dA), dA)
    vB = randomIntegerRange(Math.pow(10, dB - 1), Math.pow(10, dB), dB)
    valueA.set(vA);
    valueB.set(vB);
    // console.log(`🚀 ~ file: math_operations.js ~ line 66 ~ newRandomValues ~ ${vA} ${sO.symbol} ${vB}`)
    // console.log(`🚀 ~ file: math_operations.js ~ line 69 ~ newRandomValues ~ ${vA} ${sO['symbol']} ${vB}`,)
    let answer = eval(`${vA} ${sO['symbol']} ${vB}`);
    sO.name === 'Divide' ? (answer = setDivisionPrecision(answer)) : answer;
    result.set(answer);
    return [vA, vB, answer, sO];
}

function randomIntegerRange(min, max, digits) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString().length > digits ? --num : num;
}

export function generateNewWorksheet() {
    let problem = {}, problems = [], sheet = {}, numProblems = get(problemsPerPage)
    console.log(`🚀 ~ file: math_operations.js ~ line 114 ~ generateNewWorksheet ~ numProblems`, numProblems)
    for (let i = 0; i < numProblems; i++) {
        let values = newRandomValues();
        problem = {
            valueA: values[0],
            valueB: values[1],
            result: values[2],
            op: values[3],
        }
        problems.push(problem);
    }
    let columns = get(pageColumns)
    sheet['operation'] = get(selectedOperation)
    sheet['xid'] = uuidv4();
    sheet['problems'] = problems;
    sheet['columns'] = columns;
    worksheet.set(sheet);
    console.log(`🚀 ~ file: math_operations.js ~ line 128 ~ newworksheet setWorksheetValuesToDOM ~ worksheet`, sheet)
    setWorksheetValuesToDOM(sheet);
    return sheet
}
