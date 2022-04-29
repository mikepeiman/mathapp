<script>
	// export let digitsA, digitsB
	import { newProblemWithRandomValues, generateNewWorksheet, showOrHideResults } from '$utils/math_operations.js';
	import {
		LSgetWorksheetValuesFromDOM,
		setWorksheetValuesToDOM,
		resizeAllInputs
	} from '$utils/dom_operations.js';
	import {
		selectedOperation,
		digitsA,
		digitsB,
		valueA,
		valueB,
		problemsPerPage,
		pageColumns,
		showAnswers,
		worksheet,
		saveWorksheetLS,
		LScheckForWorksheet,
		getAllWorksheets,
		randomizeOperations,
		saveWorksheetSupabase,
		getWorksheetsFromSupabase
	} from '$stores/math.js';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import Checkbox from './Checkbox.svelte';
	import { onMount, afterUpdate } from 'svelte';
	$: sheet = {};
	$: console.log(`🚀 ~ file: MathSettings.svelte ~ line 22 ~ sheet`, sheet);

	onMount(() => {});
	function refreshWorksheet() {
		sheet = generateNewWorksheet();
		worksheet.set(sheet);
		resizeAllInputs();
	}
afterUpdate(() => {
    console.log(`🚀 ~ file: MathSettings.svelte ~ line 42 ~ afterUpdate ~ 'afterUpdate';`, 'afterUpdate')
})

	function revealAnswers() {
		showOrHideResults()
		resizeAllInputs();
	}
	$: {
		$showAnswers ? revealAnswers() : revealAnswers();
	}
	function save() {
		saveWorksheetLS();
	}
	function saveDB() {
		saveWorksheetSupabase();
	}
	function checkWorksheetValues() {
		sheet = get(worksheet);
		console.log(`🚀 ~ file: MathSettings.svelte ~ line 56 ~ checkWorksheetValues ~ sheet`, sheet);
	}

	function setDOMValues() {
		sheet = get(worksheet);
		setWorksheetValuesToDOM(sheet);
	}

	function getWorksheetValuesFromStore() {
		sheet = get(worksheet);
        console.log(`🚀 ~ file: MathSettings.svelte ~ line 67 ~ getWorksheetValuesFromStore ~ sheet`, sheet)
		
	}
</script>

<div
	id="settings"
	class="flex flex-col items-center justify-start pt-10 bg-blueGray-800"
>
	<!-- <h1>Selected Operation: {$selectedOperation.name}</h1> -->
	<div class="grid digits-grid gap-2 align-baseline w-full p-6">
		<div class="relative flex items-end">
			<label for="problemsPerPage" class=" bottom-0 p-2 inline-flex" >Number of problems</label>
		</div>
		<input
			type="number"
			step="1"
			min="1"
			max="100"
			name="problemsPerPage"
			bind:value={$problemsPerPage}
			class="basic-underline-number-input text-lg inline-block"
		/>
		<div class="relative flex items-end">
			<label for="pageColumns" class=" bottom-0 p-2 inline-flex">Columns</label>
		</div>
		<input
			type="number"
			name="pageColumns"
			min="1"
			max="4"
			bind:value={$pageColumns}
			class="basic-underline-number-input text-lg inline-block"
		/>
		<div class="relative flex items-end">
			<label for="digitsA" class=" bottom-0 p-2 inline-flex">Digits for first input</label>
		</div>
		<input
			type="number"
			name="digitsA"
			bind:value={$digitsA}
			class="basic-underline-number-input text-lg inline-block"
		/>
		<div class="relative flex items-end">
			<label for="digitsA" class="p-2  bottom-0">Digits for second input</label>
		</div>
		<input
			type="number"
			name="digitsB"
			bind:value={$digitsB}
			class="basic-underline-number-input"
		/>
	</div>
	<div class="flex flex-col items-stretch">
		<button on:click={refreshWorksheet} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
			>Generate new worksheet</button
		>
		<button on:click={save} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
			>Save worksheet LS</button
		>
		<button on:click={saveDB} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
			>Save worksheet DB</button
		>
		<!-- <button on:click={resizeAllInputs} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
			>Resize inputs</button
		> -->
		<button on:click={getWorksheetsFromSupabase} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
			>Get worksheets from DB</button
		>
		<!-- <button on:click={getAllWorksheets} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
			>Get all worksheets</button
		>
		<button on:click={setDOMValues} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
			>Set values to DOM</button
		>
		<button on:click={LSgetWorksheetValuesFromDOM} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
			>Get current worksheet DOM</button
		>
		<button on:click={getWorksheetValuesFromStore} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
			>Get current worksheet store</button
		> -->
	</div>
	<label for="showAnswers" class="flex items-center"
		>Show Answers
		<Checkbox
			name="showAnswers"
			bind:checked={$showAnswers}
			class=" m-4 bg-winterblues-500 bg-opacity-50"
		/>{$showAnswers}
	</label>
</div>

<style lang="scss">
	.digits-grid {
		grid-template-columns: 1fr 2rem;
	}
	input[type='text'] {
		outline: 2px;
		width: 8ch;
		font-size: 2.5rem;
		:focus {
			outline: none;
			border: none;
		}
		:active {
			background-color: none;
			background: none;
		}
		::selection {
			background-color: red;
			background: none;
		}
	}
	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
		margin: 0;
	}
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
