import { currentWorksheetID } from '$stores/math'
import { get } from 'svelte/store'
import { v4 as uuidv4 } from 'uuid';


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

export function getWorksheetValuesFromDOM() {
    let newSheet = {}
    let id = get(currentWorksheetID) ? get(currentWorksheetID) : uuidv4();
    console.log(`🚀 ~ file: dom_operations.js ~ line 30 ~ getWorksheetValuesFromDOM ~ id`, id)
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