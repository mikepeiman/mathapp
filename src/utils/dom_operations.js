import { currentWorksheetID, showAnswers, digitsA, digitsB, saveWorksheetLS, worksheet } from '$stores/math'
import { newProblemWithRandomValues } from './math_operations';
import { get } from 'svelte/store'
import { v4 as uuidv4 } from 'uuid';
let longest = 0
let longestA = 0, longestB = 0, longestResult = 0;

export function setWorksheetValuesToDOM(sheet) {
    // console.log(`🚀 ~ file: math_operations.js ~ line 79 ~ setWorksheetValuesToDOM ~ sheet`, sheet.problems)
    let problemsElements = document.getElementsByClassName('math-problem');
    Object.keys(problemsElements).forEach((i) => {
        let problemEl = problemsElements[i];
        // console.log(`🚀 ~ file: math_operations.js ~ line 83 ~ Object.keys ~ problemEl`, problemEl)
        let inputs = problemEl.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        let problem = sheet.problems[i];
        // console.log(`🚀 ~ file: dom_operations.js ~ line 17 ~ Object.keys ~ i`, i)
        // console.log(`🚀 ~ file: dom_operations.js ~ line 17 ~ Object.keys ~ problem`, problem)
        if (!problem) {
            // console.log(`🚀 ~ file: dom_operations.js ~ line 19 ~ Object.keys ~ !problem`, !problem)
            problem = newProblemWithRandomValues('client')
            // console.log(`🚀 ~ file: dom_operations.js ~ line 21 ~ Object.keys ~ problem`, problem)
            sheet.problems[i] = problem
        }
        let values = []
        Object.values(problem).forEach((value, i) => {
            // console.log(`🚀 ~ file: math_operations.js ~ line 89 ~ Object.problems ~ value, i`, value, i)
            values.push(value);
        })
        Array.from(inputs).forEach((input, j) => {
            // console.log(`🚀 ~ file: math_operations.js ~ line 88 ~ Array.from ~ input #${j}`, input)
            input.value = values[j]
            // console.log(`🚀 ~ file: dom_operations.js ~ line 24 ~ Array.from ~ values`, values)
            input.setAttribute("data-value", values[j])
            // resizeInput.call(input);
        });
    });
    // saveWorksheetLS()
    // return worksheet
}

export function LSgetWorksheetValuesFromDOM() {
    let newSheet = {}
    let id = get(currentWorksheetID) ? get(currentWorksheetID) : uuidv4();
    console.log(`🚀 ~ file: dom_operations.js ~ line 30 ~ LSgetWorksheetValuesFromDOM ~ id`, id)
    newSheet['problems'] = []
    let problemsElements = document.getElementsByClassName('math-problem');
    Object.keys(problemsElements).forEach((i) => {
        let problemEl = problemsElements[i];
        // console.log(`🚀 ~ file: math_operations.js ~ line 83 ~ Object.keys ~ problemEl`, problemEl)
        let children = problemEl.children;
        children = Array.from(children);
        let inputs = children.filter((input) => input.tagName === 'INPUT');
        let operationEl = children.filter((input) => input.name === 'operation-icon');
        console.log(`🚀 ~ file: dom_operations.js ~ line 43 ~ Object.keys ~ operationEl`, operationEl)
        let problem = {}

        Array.from(inputs).forEach((input, j) => {
            problem[input.name] = input.value
        });
        problem['operation'] = operationEl[0].value
        newSheet['problems'].push(problem)
    });
    console.log(`🚀 ~ file: dom_operations.js ~ line 43 ~ Object.keys ~ newSheet`, newSheet)
    return newSheet
    // return worksheet
}


export async function resizeAllInputs() {
    // console.log(`🚀 ~ file: dom_operations.js ~ line 72 ~ resizeAllInputs ~ resizeAllInputs`)
    
    let problemsElements = await document.getElementsByClassName('math-problem');
    
    Object.keys(problemsElements).forEach((i) => {
        let problemEl = problemsElements[i];
        let inputs = problemEl.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        Array.from(inputs).forEach((input, i) => {
            input.addEventListener('change', resizeInput);
            input.addEventListener('input', resizeInput);
            resizeInput.call(input);
        });
    });
    // console.log(`🚀 ~ file: dom_operations.js ~ line 7 ~ longestA, longestB, longestResult`, longestA, longestB, longestResult)
    Object.keys(problemsElements).forEach((i) => {
        let problemEl = problemsElements[i];
        let inputs = problemEl.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        Array.from(inputs).forEach((input, i) => {
            let name = input.getAttribute('name');
            name === 'valueA' ? input.style.width = longestA + 2 + 'ch' : false
            name === 'valueB' ? input.style.width = longestB + 2 + 'ch': false
            name === 'result' ? input.style.width = longestResult + 2 + 'ch': false
            // resizeInput.call(input);
        });
    });
    return {longestA, longestB, longestResult}
}

export async function resizeInput() {
    let name =  this.getAttribute('name');
    let val =  this.getAttribute('data-value')
    if (name === 'valueA') {
        // console.log(`🚀 ~ file: dom_operations.js ~ line 107 ~ resizeInput ~ name === 'valueA'`, name === 'valueA')
        longestA = val.length > longestA ? val.length : longestA;
        // console.log(`🚀 ~ file: dom_operations.js ~ line 109 ~ resizeInput ~ val`, val)
        typeof val
        // console.log(`🚀 ~ file: dom_operations.js ~ line 112 ~ resizeInput ~ typeof val`, typeof val)
        // console.log(`🚀 ~ file: dom_operations.js ~ line 109 ~ resizeInput ~ val.length`, val.length)
    }
    if (name === 'valueB') {
        // console.log(`🚀 ~ file: dom_operations.js ~ line 111 ~ resizeInput ~ name === 'valueB'`, name === 'valueB')
        longestB = val.length > longestB ? val.length : longestB;
    }
    if (name === 'result') {
        // console.log(`🚀 ~ file: dom_operations.js ~ line 115 ~ resizeInput ~ name === 'result'`, name === 'result')
        longestResult = val.length > longestResult ? val.length : longestResult;
    }
    let show = get(showAnswers)
    let sheet = get(worksheet)
    // console.log(`🚀 ~ file: math_operations.js ~ line 109 ~ thissArray.forEach ~ this`, this)
    // console.log(`🚀 ~ file: math_operations.js ~ line 109 ~ thissArray.forEach ~ this.value: `, this.value)
    this.style.width = this.value.length + 2 + 'ch'
    let thisLength = this.value.length;
    thisLength > longest ? longest = thisLength : longest;
    if (this.name === "result") {
        this.setAttribute('data-value', val);
        show ? this.value = val : this.value = '';
        // show ? this.style.opacity = 100 : this.style.opacity = 0;
        this.style.width = val.length + 2 + 'ch'
    }
}