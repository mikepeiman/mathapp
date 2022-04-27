import { writable } from "svelte/store"
// import { supabase } from '$lib/supabaseClient.js'
const settingsChange = writable({})

export const currentView = writable('home')
export const showModal = writable(false);
export const storedSettingsChange = {
    subscribe: settingsChange.subscribe,
    set: val => {
        console.log(`🚀 ~ file: stores.js ~ line 8 ~ val`, val)
        settingsChange.set(val);
        localStorage.setItem("settingsChange", JSON.stringify(val));
    }
};

