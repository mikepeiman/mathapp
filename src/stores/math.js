import { writable, get } from "svelte/store";
import { supabase } from "$lib/supabaseClient.js";
import { v4 as uuidv4 } from 'uuid';
import { getWorksheetValuesFromDOM } from '$utils/dom_operations'

export const currentWorksheetID = writable(null);
export const worksheet = writable({});
export const worksheets = writable([]);
export const selectedOperation = writable({});
export const valueA = writable(0);
export const valueB = writable(0);
export const result = writable(0);
export const digitsA = writable(2);
export const digitsB = writable(2);
export const problemsPerPage = writable(20);
export const pageColumns = writable(2);
export const showAnswers = writable(true);

selectedOperation.subscribe(operation => {
    console.log(`🚀 ~ file: math.js ~ line 19 ~ operation`, operation)
})

export const saveWorksheetLS = async () => {
    let sheet = await updateWorksheet()
    localStorage.setItem("worksheet", JSON.stringify(sheet));
}

async function updateWorksheet() {
    let sheet = get(worksheet);
    let operation = get(selectedOperation);
    sheet.operation = operation;
    let values = await getWorksheetValuesFromDOM()
    console.log(`🚀 ~ file: math.js ~ line 34 ~ updateWorksheet ~ values`, values)
    sheet.problems = values.problems
    worksheet.set(sheet);
    return sheet
}

export const saveWorksheetSupabase = async () => {
    let sheet = await updateWorksheet()
}

export const checkForWorksheet = () => {
    let sheet = get(worksheet)
    if (sheet.length) {
        console.log(`🚀 ~ file: stores.js ~ line 53 ~ checkForWorksheet ~ sheet`, sheet)
        return true
    } else if (localStorage && localStorage.getItem("worksheet")) {
        sheet = localStorage.getItem("worksheet")
        console.log(`🚀 ~ file: math.js ~ line 31 ~ checkForWorksheet ~ sheet`, sheet)
        worksheet.set(JSON.parse(localStorage.getItem("worksheet")))
        return true
    }
    return false
}
export const getAllWorksheets = () => {
    // supabase.get(`worksheets`).then(res => {
    //     console.log(`🚀 ~ file: stores.js ~ line 67 ~ getAllWorksheets ~ res`, res)
    // })
    let sheets = get(worksheets)
    if (sheets.length) {
        console.log(`🚀 ~ file: stores.js ~ line 53 ~ getAllWorksheets ~ sheet`, sheets)
        return sheets
    } else if (localStorage && localStorage.getItem("worksheets")) {
        sheets = JSON.parse(localStorage.getItem("worksheets"))
        console.log(`🚀 ~ file: math.js ~ line 31 ~ getAllWorksheets ~ sheets`, sheets)
        worksheets.set(sheets)
        return sheets
    } else {
        console.log(`no worksheets found getAllWorksheets`)
    }

    return false
}

export const getWorksheet = () => {
    let sheet = get(worksheet)
    if (sheet.length) {
        console.log(`🚀 ~ file: stores.js ~ line 53 ~ getWorksheet ~ sheet`, sheet)
        return sheet
    } else if (localStorage && localStorage.getItem("worksheet")) {
        sheet = JSON.parse(localStorage.getItem("worksheet"))
        console.log(`🚀 ~ file: math.js ~ line 31 ~ getWorksheet ~ sheet`, sheet)
        worksheet.set(sheet)
        return sheet
    }
    return false
}

export const getCurrentWorksheetValues = () => {
    // 
}