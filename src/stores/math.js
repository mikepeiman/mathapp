// import writable from svelte
import { writable, get } from "svelte/store";
import { supabase } from "$lib/supabaseClient.js";

export const worksheet = writable({});
export const selectedOperation = writable({});
export const valueA = writable(0);
export const valueB = writable(0);
export const result = writable(0);
export const digitsA = writable(2);
export const digitsB = writable(2);
export const problemsPerPage = writable(20);
export const pageColumns = writable(2);
export const showAnswers = writable(true);

export const addWorksheet = {
    subscribe: worksheet.subscribe,
    set: val => {
        worksheet.set(val);
        localStorage.setItem("worksheet", JSON.stringify(val));
    },
    // supabase.set(`worksheets/${worksheet.id}`, worksheet)
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