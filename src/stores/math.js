import { writable, get } from "svelte/store";
import { supabase } from "$lib/supabaseClient.js";
import { v4 as uuidv4 } from 'uuid';
import { currentUser } from '$stores/auth.js';
import { LSgetWorksheetValuesFromDOM } from '$utils/dom_operations'

export const currentWorksheetID = writable(null);
export const worksheet = writable({});
export const worksheets = writable([]);
export const supabaseWorksheets = writable([]);
export const selectedOperation = writable({});
export const valueA = writable(0);
export const valueB = writable(0);
export const result = writable(0);
export const digitsA = writable(2);
export const digitsB = writable(2);
export const problemsPerPage = writable(20);
export const pageColumns = writable(2);
export const showAnswers = writable(true);
export const randomizeOperations = writable(false);
export const worksheetSaved = writable(false);

export const saveWorksheetLS = async () => {
    // let sheet = await updateWorksheet()
    let sheet = get(worksheet);
    console.log(`🚀 ~ file: math.js ~ line 26 ~ saveWorksheetLS ~ sheet`, sheet)
    let operation = get(selectedOperation);
    let cols = get(pageColumns);
    sheet.columns = cols;
    sheet.operation = operation;
    sheet.saved = true
    sheet.num_problems = sheet?.problems?.length
    worksheetSaved.set(true)
    // check by id if worksheet exists in worksheets array; if it is, replace it; if not, add it
    // let sheets = get(worksheets);
    // let index = sheets.findIndex(sheet => sheet.id === sheet.id);
    // if (index > -1) {
    //     sheets[index] = sheet;
    // } else {
    //     sheets.push(sheet);
    // }
    worksheet.set(sheet)
    localStorage.setItem("worksheet", JSON.stringify(sheet));
    // worksheets.set(sheets)
    // localStorage.setItem("worksheets", JSON.stringify(sheets));
}

export const getWorksheetsFromSupabase = async () => {
    let activeUser = supabase.auth.user()
    console.log(`🚀 ~ file: math.js ~ line 48 ~ getWorksheetsFromSupabase ~ activeUser`, activeUser)
    if (activeUser) {

        let user_id = activeUser.id;
        const { data, error } = await supabase.from('worksheets').select().match({ user_id })
        if (error) {
            console.error(error)
        } else {
            data.forEach(sheet => {
                sheet.problems = JSON.parse(sheet.problems)
            })
            worksheets.set(data)
            supabaseWorksheets.set(data)
            console.log(`🚀 ~ file: math.js ~ line 37 ~ getWorksheetsFromSupabase ~ data`, data)
            return data
        }
    } else {
        console.log('Please log in to view your worksheets')
    }
}

export const loadWorksheet = async (sheet) => {
    // let sheet = get(worksheet);
    // let sheet = get(worksheets).find(sheet => sheet.id === id)
    console.log(`🚀 ~ file: math.js ~ line 48 ~ loadWorksheet ~ sheet`, sheet)
    currentWorksheetID.set(sheet.xid)
    worksheet.set(sheet)
    selectedOperation.set(sheet.operation)
    problemsPerPage.set(sheet.problems.length)
    pageColumns.set(sheet.columns)

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
    // let sheet = await updateWorksheet()
    let sheet = get(worksheet);
    let storeSheets = get(worksheets);
    sheet.saved = true
    let activeUser = get(user)
    console.log(`🚀 ~ file: math.js ~ line 87 ~ saveWorksheetSupabase ~ user`, activeUser)
    if (activeUser) {
        let user_id = activeUser.id
        console.log(`🚀 ~ file: math.js ~ line 41 ~ saveWorksheetSupabase ~ sheet`, sheet)
        let xid = sheet.xid
        // console.log(`🚀 ~ file: math.js ~ line 43 ~ saveWorksheetSupabase ~ supabase`, supabase)

        // const { data, error } = await supabase.from('worksheets').insert({ xid: sheet.xid, user_id, problems: JSON.stringify(sheet.problems), columns: sheet.columns, operation: sheet.operation });
        // const { data, error } = await supabase.from('worksheets').upsert({ xid: sheet.xid, user_id, problems: JSON.stringify(sheet.problems), columns: sheet.columns, operation: sheet.operation }, {onConflict: 'xid'});
        const { data, error } = await supabase.from('worksheets').upsert({ xid, user_id, problems: JSON.stringify(sheet.problems), columns: sheet.columns, operation: sheet.operation }, { onConflict: 'xid' })
        if (error) {
            sheet.saved = false
            worksheetSaved.set(false)
            return console.error(error)
        } else {
            console.log(`🚀 ~ file: math.js ~ line 47 ~ saveWorksheetSupabase ~ data`, data)
            let exists = checkForExistingWorksheetXid(xid)
            if (exists) {
                let idx = storeSheets.findIndex(sheet => sheet.xid === xid);
                data[0].problems = JSON.parse(data[0].problems)
                let updatedSheet = data[0]
                storeSheets[idx] = updatedSheet;
                console.log(`🚀 ~ file: math.js ~ line 118 ~ saveWorksheetSupabase ~ storeSheets`, storeSheets)
                worksheets.set(storeSheets)
                console.log(`🚀 ~ file: math.js ~ line 116 ~ saveWorksheetSupabase ~ exists idx`, idx)
            } else {
                worksheets.update((cur) => {
                    data[0].problems = JSON.parse(data[0].problems)
                    const newWorksheets = [...cur, data[0]]
                    return newWorksheets
                })
            }
            worksheetSaved.set(true)
        }
    } else {
        alert('You must be logged in to save worksheets')
    }
}

function checkForExistingWorksheetXid(xid) {
    let storeSheets = get(worksheets);
    let existingWorksheet = storeSheets.find(sheet => sheet.xid === xid);
    console.log(`🚀 ~ file: math.js ~ line 128 ~ checkForExistingWorksheetXid ~ existingWorksheet`, existingWorksheet)
    return existingWorksheet
}

export const deleteWorksheet = async (id) => {
    console.log(`🚀 ~ file: math.js ~ line 116 ~ deleteWorksheet ~ id`, id)
    // get index of sheet with parameter id from worksheets
    let activeUser = get(user)
    console.log(`🚀 ~ file: math.js ~ line 118 ~ deleteWorksheet ~ activeUser`, activeUser)
    if (activeUser) {

        let user_id = activeUser.id
        const { data, error } = await supabase.from('worksheets').delete().match({ id });
        console.log(`🚀 ~ file: math.js ~ line 121 ~ deleteWorksheet ~ data`, data)
        if (error) {
            return console.error(error)
        } else {
            let sheets = get(worksheets)
            let nextSheet
            let index = sheets.findIndex(x => x.id === id)
            worksheets.update((worksheets) => worksheets.filter(ws => ws.id !== id))
            console.log(`🚀 ~ file: math.js ~ line 105 ~ deleteWorksheet ~ index`, index)
            let len = sheets.length
            console.log(`🚀 ~ file: math.js ~ line 107 ~ deleteWorksheet ~ len`, len)
            index + 1 >= len ? nextSheet = sheets[0] : nextSheet = sheets[index + 1]
            console.log(`🚀 ~ file: math.js ~ line 110 ~ deleteWorksheet ~ nextSheet`, nextSheet)
            // currentWorksheetID.set(nextSheet.xid)
            loadWorksheet(nextSheet)
        }
    } else {
        alert('You must be logged in to delete worksheets')
    }
}



export const LScheckForWorksheet = () => {
    let sheet = get(worksheet)
    if (sheet.length) {
        console.log(`🚀 ~ file: stores.js ~ line 53 ~ LScheckForWorksheet ~ sheet`, sheet)
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
export const getAllLSWorksheets = () => {
    let sheets = []
    if (localStorage && localStorage.getItem("worksheets")) {
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
        return sheet = get(worksheet)
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