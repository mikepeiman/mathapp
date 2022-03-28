import { writable, get } from "svelte/store";
import { supabase } from "$lib/supabaseClient.js";
import { v4 as uuidv4 } from 'uuid';
import { LSgetWorksheetValuesFromDOM } from '$utils/dom_operations'

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
    let sheets = get(worksheets);
    sheets.push(sheet)
    localStorage.setItem("worksheets", JSON.stringify(sheets));
}

export const getWorksheetsFromSupabase = async () => {
    const { data, error } = await supabase.from('worksheets').select()
    if (error) {
        console.error(error)
    } else {
        worksheets.set(data)
        console.log(`🚀 ~ file: math.js ~ line 37 ~ getWorksheetsFromSupabase ~ data`, data)
        return data
    }
}


async function updateWorksheet() {
    let sheet = get(worksheet);
    let operation = get(selectedOperation);
    sheet.operation = operation;
    let values = await LSgetWorksheetValuesFromDOM()
    console.log(`🚀 ~ file: math.js ~ line 34 ~ updateWorksheet ~ values`, values)
    sheet.problems = values.problems
    worksheet.set(sheet);
    return sheet
}

export const saveWorksheetSupabase = async () => {
    let sheet = await updateWorksheet()
    console.log(`🚀 ~ file: math.js ~ line 41 ~ saveWorksheetSupabase ~ sheet`, sheet)
    console.log(`🚀 ~ file: math.js ~ line 43 ~ saveWorksheetSupabase ~ supabase`, supabase)
    console.log(`🚀 ~ file: math.js ~ line 45 ~ saveWorksheetSupabase ~ {id: sheet.id, problems: JSON.stringify(sheet.problems), columns: sheet.columns, operation: sheet.operation}`, { xid: sheet.xid, problems: JSON.stringify(sheet.problems), columns: sheet.columns, operation: sheet.operation })

    const { data, error } = await supabase.from('worksheets').insert([{ xid: sheet.xid, problems: JSON.stringify(sheet.problems), columns: sheet.columns, operation: sheet.operation }]);
    if (error) {
        return console.error(error)
    }
    console.log(`🚀 ~ file: math.js ~ line 47 ~ saveWorksheetSupabase ~ data`, data)
}

export const LScheckForWorksheet = () => {
    let sheet = get(worksheet)
    if (sheet.length) {
        // console.log(`🚀 ~ file: stores.js ~ line 53 ~ LScheckForWorksheet ~ sheet`, sheet)
        return true
    } else if (localStorage && localStorage.getItem("worksheet")) {
        sheet = localStorage.getItem("worksheet")
        // console.log(`🚀 ~ file: math.js ~ line 31 ~ LScheckForWorksheet ~ sheet`, sheet)
        worksheet.set(JSON.parse(localStorage.getItem("worksheet")))
        return true
    }
    return false
}
export const getAllWorksheets = () => {
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

export const LSgetWorksheet = (xid) => {
    let sheet = get(worksheet)
    if (xid === "current") {
        sheet = get(worksheet)
    } else if (xid) {
        sheet = get(worksheets).filter(sheet => sheet.xid === xid)[0]
    }
    if (sheet.length) {
        console.log(`🚀 ~ file: stores.js ~ line 53 ~ LSgetWorksheet ~ sheet`, sheet)
        return sheet
    } else if (localStorage && localStorage.getItem("worksheet")) {
        sheet = JSON.parse(localStorage.getItem("worksheet"))
        console.log(`🚀 ~ file: math.js ~ line 31 ~ LSgetWorksheet ~ sheet`, sheet)
        worksheet.set(sheet)
        return sheet
    }
    return false
}

export const getCurrentWorksheetValues = () => {
    // 
}