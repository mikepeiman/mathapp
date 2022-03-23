<script>
	import { onMount } from 'svelte';

	// create functions for math operations
	// create add function
	const add = (a, b) => a + b;
	// create subtract function
	const subtract = (a, b) => a - b;
	// create multiply function
	const multiply = (a, b) => a * b;
	// create divide function
	const divide = (a, b) => a / b;

	let valueA, valueB, result;

	onMount(() => {
		// set default values
		valueA = Math.ceil(Math.random() * 100);
		valueB = Math.ceil(Math.random() * 100);
		result = multiply(valueA, valueB);
	});

	function newRandomValues() {
		valueA = Math.ceil(Math.random() * 100);
		valueB = Math.ceil(Math.random() * 100);
		result = multiply(valueA, valueB);
	}
</script>

<div class="flex w-full h-full items-center justify-center">
	<div class="flex flex-col p-4 bg-winterblues-900 w-[50%] h-[50%] items-center justify-center">
		<button on:click={newRandomValues} class="p-4 bg-winterblues-800">New values</button>
		<div class="flex">
			<input
				type="text"
				bind:value={valueA}
				class="outline-none ring-none border-l-0 border-t-0 border-r-0 p-3 m-2 border-b-2 border-b-lime-500 bg-none bg-transparent focus:ring-0 focus:outline-none"
				placeholder="value A"
			/>
			<div class="flex items-center justify-center">X</div>
			<input
				type="text"
				bind:value={valueB}
				class="outline-none ring-none border-l-0 border-t-0 border-r-0 p-3 m-2 border-b-2 border-b-lime-500 bg-none bg-transparent focus:ring-0 focus:outline-none"
				placeholder="value B"
			/>
			<div class="flex items-center justify-center">=</div>
			<input
				type="text"
				bind:value={result}
				class="outline-none ring-none border-l-0 border-t-0 border-r-0 p-3 m-2 border-b-2 border-b-lime-500 bg-none bg-transparent focus:ring-0 focus:outline-none"
				placeholder="value C"
			/>
		</div>
	</div>
</div>

<style lang="scss" global>
	input {
		outline: 2px;
		:focus {
			outline: none;
			border: none;
		}
	}
</style>
