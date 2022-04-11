import { digitsA, digitsB, result, selectedOperation, valueA, valueB, showAnswers, pageColumns, problemsPerPage, worksheet, randomizeOperations, saveWorksheetLS } from '$stores/math.js'
import { setWorksheetValuesToDOM, resizeAllInputs, resizeInput } from './dom_operations';
import { get } from 'svelte/store'
import { v4 as uuidv4 } from 'uuid';
let dA,dB ,vA ,vB , sO ,res 
let longest = 0
let operations = [
    {
        name: 'addition',
        symbol: '+',
        iconname: 'fa-solid:plus'
    },
    {
        name: 'subtraction',
        symbol: '-',
        iconname: 'fa-solid:minus'
    },
    {
        name: 'multiplication',
        symbol: '*',
        iconname: 'fa-solid:times'
    },
    {
        name: 'division',
        symbol: '/',
        iconname: 'fa-solid:divide'
    },
];

export function processCalculation(a, b, operation, singleOperation) {
    res = eval(`${a} ${operation.symbol} ${b}`);
    operation.symbol === '/' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    // singleOperation ? saveWorksheetLS() : null;
    return res;
}
export function processCalculationFromAttributes(inputs) {
    vA = inputs[0].getAttribute('data-value')
    vB = inputs[1].getAttribute('data-value')
    sO = get(selectedOperation)
    res = eval(`${vA} ${sO.symbol} ${vB}`);
    sO.symbol === '/' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    return res;
}
export function processCalculationFromValues(inputs) {
    vA = inputs[0].value
    vB = inputs[1].value
    sO = get(selectedOperation)
    res = eval(`${vA} ${sO.symbol} ${vB}`);
    sO.symbol === '/' ? (res = setDivisionPrecision(res)) : res;
    result.set(res);
    return res;
}

export function recalculateProblems() {
    let sheet = get(worksheet)
    let problems = sheet.problems
    if (problems) {

        let op = get(selectedOperation)
        console.log(`🚀 ~ file: math_operations.js ~ line 67 ~ recalculateProblems ~ op`, op)
        let thisop = op

        // console.log(`🚀 ~ file: math_operations.js ~ line 65 ~ recalculateProblems ~ op.symbol === '?'`, op.symbol === '?')

        // console.log(`🚀 ~ file: math_operations.js ~ line 63 ~ recalculateProblems ~ problems`, problems)
        problems?.forEach(problem => {
            // console.log(`🚀 ~ file: math_operations.js ~ line 65 ~ recalculateProblems ~ problem`, problem)
            if (op.symbol === '?') {
                thisop = operations[Math.floor(Math.random() * operations.length)]
                // console.log(`🚀 ~ file: math_operations.js ~ line 67 ~ recalculateProblems ~ thisop`, thisop)
                // selectedOperation.set(op)
            }
            problem.op = thisop
            problem.result = processCalculation(problem.valueA, problem.valueB, thisop)
        })
        sheet.problems = problems
        saveWorksheetLS()
    }

}

export function showOrHideResults() {
    let problemsElements = document.getElementsByClassName('math-problem');
    let show = get(showAnswers);
    let sheet = get(worksheet)
    let problems = sheet.problems
    Object.keys(problemsElements).forEach((i) => {
        let problemEl = problemsElements[i];
        let inputs = problemEl.children;
        // console.log(`🚀 ~ file: math_operations.js ~ line 92 ~ Object.keys ~ inputs`, inputs)
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        let inputsArray = Array.from(inputs)
        let res = problems[i].result;
        inputsArray.forEach((input, i) => {
            // input.value ? (input.style.width = input.value.length + 2 + 'ch') : (input.style.width = '1ch');
            input.style.width = input.value.length + 2 + 'ch'
            // if (input.name === "result") {
            //     console.log(`🚀 ~ file: math_operations.js ~ line 109 ~ inputsArray.forEach ~ input`, input)
            //     input.setAttribute('data-value', res);
            //     show ? input.value = res : input.value = ' ';
            //     // show ? input.style.opacity = 100 : input.style.opacity = 0;
            //     input.style.width = res.toString().length + 2 + 'ch'
            // }
            resizeInput.call(input);
        });
    });
}

export function setDivisionPrecision(res) {
    res.toFixed(3);
    vA % vB === 0 ? res : (res = res.toFixed(3));
    return res;
}

export function newProblemWithRandomValues(env) {
    console.log(`🚀 ~ file: math_operations.js ~ line 124 ~ newProblemWithRandomValues ~ env`, env)
    if (env == 'client') {

        dA = 2
        dB = 2
        sO = operations[Math.floor(Math.random() * operations.length)]
    } else {
        dA = get(digitsA) || 2
        dB = get(digitsB) || 2
        sO = get(selectedOperation) || operations[Math.floor(Math.random() * operations.length)]

    }
    let randomize = get(randomizeOperations)
    // get random operation
    let randomOperation = operations[Math.floor(Math.random() * operations.length)];
    let operation = sO
    // console.log(`🚀 ~ file: math_operations.js ~ line 63 ~ newProblemWithRandomValues ~ sO`, sO)
    // if (!sO.length) {
    //     sO = operations[1];
    //     // console.log(`🚀 ~ file: math_operations.js ~ line 100 ~ newProblemWithRandomValues ~ sO`, sO)
    //     selectedOperation.set(sO);
    // } 
    if (operation.symbol === '?') {
        operation = randomOperation
    }

    randomize ? operation = randomOperation : false;
    vA = randomIntegerRange(Math.pow(10, dA - 1), Math.pow(10, dA), dA)
    vB = randomIntegerRange(Math.pow(10, dB - 1), Math.pow(10, dB), dB)
    valueA.set(vA);
    valueB.set(vB);
    // console.log(`🚀 ~ file: math_operations.js ~ line 66 ~ newProblemWithRandomValues ~ ${vA} ${sO.symbol} ${vB}`)
    // console.log(`🚀 ~ file: math_operations.js ~ line 69 ~ newProblemWithRandomValues ~ ${vA} ${sO['symbol']} ${vB}`,)
    let answer = eval(`${vA} ${operation['symbol']} ${vB}`);
    operation.symbol === '/' ? (answer = setDivisionPrecision(answer)) : answer;
    result.set(answer);
    return {valueA: vA,  valueB: vB, result: answer, op: operation};
}

function randomIntegerRange(min, max, digits) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString().length > digits ? --num : num;
}

export function generateNewWorksheet() {
    let problem = {}, problems = [], sheet = {}, numProblems = get(problemsPerPage)
    console.log(`🚀 ~ file: math_operations.js ~ line 114 ~ generateNewWorksheet ~ numProblems`, numProblems)
    for (let i = 0; i < numProblems; i++) {
        let problem = newProblemWithRandomValues();
        // problem = {
        //     valueA: values[0],
        //     valueB: values[1],
        //     result: values[2],
        //     op: values[3],
        // }
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
    saveWorksheetLS();
    return sheet
}
