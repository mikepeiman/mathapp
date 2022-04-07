import { writable } from 'svelte/store';

export const currentUser = writable(false);
export const token = writable(false);
export const tokenStore = {
    set: val => {
        token.set(val);
        localStorage.setItem("access_token", val);
    },
    get: () =>  {
        return localStorage.getItem("access_token");
    }
}