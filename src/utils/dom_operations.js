import { currentWorksheetID, showAnswers, digitsA, digitsB, saveWorksheetLS } from '$stores/math'
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
       let  inputs = children.filter((input) => input.tagName === 'INPUT');
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


export function resizeAllInputs() {
    let problemsElements = document.getElementsByClassName('math-problem');
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
}

export function resizeInput() {
    let show = get(showAnswers)
    this.style.width = this.value.length + 2 + 'ch'
    let thisLength = this.value.length;
    thisLength > longest ? longest = thisLength : longest;
    let res = this.getAttribute('data-value')
    if (this.name === "result") {
        // console.log(`🚀 ~ file: math_operations.js ~ line 109 ~ thissArray.forEach ~ this`, this)
        // this.setAttribute('data-value', res);
        show ? this.value = res : this.value = ' ';
        // show ? this.style.opacity = 100 : this.style.opacity = 0;
        this.style.width = res.toString().length + 2 + 'ch'
    }
}