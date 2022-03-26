// import writable from svelte
import { writable, get } from "svelte/store";

export const selectedOperation = writable({});
export const valueA = writable(0);
export const valueB = writable(0);
export const result = writable(0);
export const digitsA = writable(2);
export const digitsB = writable(2);
export const problemsPerPage = writable(20);
export const pageColumns = writable(2);
export const showAnswers = writable(false);