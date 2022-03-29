import { currentWorksheetID, showAnswers, digitsA, digitsB } from '$stores/math'
import { get } from 'svelte/store'
import { v4 as uuidv4 } from 'uuid';
let longest = 0

export function setWorksheetValuesToDOM(sheet) {
    console.log(`🚀 ~ file: math_operations.js ~ line 79 ~ setWorksheetValuesToDOM ~ sheet`, sheet)
    let problemsElements = document.getElementsByClassName('math-problem');
    Object.keys(problemsElements).forEach((i) => {
        let problemEl = problemsElements[i];
        // console.log(`🚀 ~ file: math_operations.js ~ line 83 ~ Object.keys ~ problemEl`, problemEl)
        let inputs = problemEl.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        let problem = sheet.problems[i];
        let values = []
        Object.values(problem).forEach((value, i) => {
            // console.log(`🚀 ~ file: math_operations.js ~ line 89 ~ Object.problems ~ value, i`, value, i)
            values.push(value);
        })
        Array.from(inputs).forEach((input, j) => {
            // console.log(`🚀 ~ file: math_operations.js ~ line 88 ~ Array.from ~ input #${j}`, input)
            input.value = values[j]
            input.setAttribute("data-value", values[j])
        });
    });
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
        let inputs = problemEl.children;
        inputs = Array.from(inputs);
        inputs = inputs.filter((input) => input.tagName === 'INPUT');
        let problem = {}

        Array.from(inputs).forEach((input, j) => {
           problem[input.name] = input.value
        });
        newSheet['problems'].push(problem)
    });
    console.log(`🚀 ~ file: dom_operations.js ~ line 43 ~ Object.keys ~ newSheet`, newSheet)
    return newSheet
    // return worksheet
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

export function resizeInput() {
    let dA = get(digitsA)
    let dB = get(digitsB)
    let show = get(showAnswers);
    // this.getAttribute('data-value') ? (this.style.width = this.getAttribute('data-value').length + 2 + 'ch') : (this.style.width = dA + dB + 1 + 'ch');
    this.style.width = this.value.length + 2 + 'ch'
    // (this.style.width = dA + dB + 1 + 'ch')
    let thisLength = this.value.length;
    thisLength > longest ? longest = thisLength : longest;
    // console.log(`🚀 ~ file: math_operations.js ~ line 127 ~ resizeInput ~ longest`, longest)
    if (this.name === "result") {
        show ? this.value = this.getAttribute('data-value') : this.value = ' ';
    }
}