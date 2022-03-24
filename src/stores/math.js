// import writable from svelte
import { writable, get } from "svelte/store";

export const selectedOperation = writable({});
export const valueA = writable(25);
export const valueB = writable(33);
export const result = writable(0);
export const digitsA = writable(2);
export const digitsB = writable(2);