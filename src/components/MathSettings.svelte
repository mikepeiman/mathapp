<script>
	// export let digitsA, digitsB
	import {
		newRandomValues,
		setWorksheetValuesToDOM,
		resizeAllInputs,
generateNewWorksheetValues
	} from '$utils/math_operations.js';
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
		addWorksheet,
		checkForWorksheet
	} from '$stores/math.js';
	import { page } from '$app/stores';
	import {get} from 'svelte/store';
	import Checkbox from './Checkbox.svelte';
	import { onMount } from 'svelte';
	$: sheet = {};
	$: console.log(`🚀 ~ file: MathSettings.svelte ~ line 22 ~ sheet`, sheet);

	worksheet.subscribe((val) => {
		console.log(`🚀 ~ file: MathSettings.svelte ~ line 28 ~ val`, val);
	});
	onMount(() => {});
	function refreshWorksheet() {
		sheet = generateNewWorksheetValues();
		worksheet.set(sheet);
		resizeAllInputs();
	}
	function revealAnswers() {
		console.log(
			`🚀 ~ file: MathSettings.svelte ~ line 25 ~ revealAnswers ~ revealAnswers`,
			$showAnswers
		);
		resizeAllInputs();
	}
	$: {
		$showAnswers ? revealAnswers() : revealAnswers();
		console.log(`🚀 ~ file: MathSettings.svelte ~ line 33 ~ $showAnswers`, $showAnswers);
	}
	function saveWorksheet() {
		sheet = get(worksheet);
		addWorksheet.set(sheet);
		console.log(`🚀 ~ file: MathSettings.svelte ~ line 47 ~ saveWorksheet ~ sheet`, sheet);
		// ...
	}
	function checkWorksheetValues() {
		sheet = get(worksheet)
        console.log(`🚀 ~ file: MathSettings.svelte ~ line 56 ~ checkWorksheetValues ~ sheet`, sheet)
	}

	function setDOMValues() {
		sheet = get(worksheet);
		setWorksheetValuesToDOM(sheet);
	}
</script>

<div
	id="settings"
	class="flex flex-col items-center justify-start pt-10 bg-winterblues-500 bg-opacity-20"
>
	<!-- <h1>Selected Operation: {$selectedOperation.name}</h1> -->
	<div class="grid digits-grid gap-2 align-baseline w-full p-6">
		<div class="relative flex items-end">
			<label for="problemsPerPage" class=" bottom-0 p-2 inline-flex">Number of problems</label>
		</div>
		<input
			type="number"
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
	<button on:click={newRandomValues} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
		>Generate random values</button
	>
	<button on:click={refreshWorksheet} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
		>Generate new worksheet</button
	>
	<button on:click={saveWorksheet} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
		>Save worksheet</button
	>
	<button on:click={resizeAllInputs} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
		>Resize inputs</button
	>
	<button on:click={checkWorksheetValues} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
		>Check worksheet values</button
	>
	<button on:click={setDOMValues} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
		>Set values to DOM</button
	>
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
