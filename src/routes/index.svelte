<script>
	import OperationsMenu from '$components/OperationsMenu.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import Select from 'svelte-select';

	let operations = [
		{
			name: 'Multiply',
			symbol: '*',
			iconname: 'fa-solid:times'
		},
		{
			name: 'Subtract',
			symbol: '-',
			iconname: 'fa-solid:minus'
		},
		{
			name: 'Add',
			symbol: '+',
			iconname: 'fa-solid:plus'
		},
		{
			name: 'Divide',
			symbol: '/',
			iconname: 'fa-solid:divide'
		},
		{
			name: 'Equals',
			symbol: '=',
			iconname: 'fa-solid:equals'
		}
	];

	// create const object with icon names
	const icons = {
		times: 'fa-solid:times',
		minus: 'fa-solid:minus',
		plus: 'fa-solid:plus',
		divide: 'fa-solid:divide',
		equals: 'fa-solid:equals'
	};

	$: selectedOperation = operations[0];
	let digitsA = 3,
		digitsB = 3;

	// create add function
	const add = (a, b) => a + b;
	// create subtract function
	const subtract = (a, b) => a - b;
	// create multiply function
	const multiply = (a, b) => a * b;
	// create divide function
	const divide = (a, b) => a / b;

	let valueA, valueB, result;
$: result
	onMount(() => {
		// set default values
		newRandomValues();
		result = processCalculation();
	});

	function processCalculation() {
		// get the result
		result = eval(`${valueA} ${selectedOperation.symbol} ${valueB}`);
		// selectedOperation.name === "Divide" ? result = result.toFixed(3) : result = result.toFixed(0);
		selectedOperation.name === 'Divide' ? result = setDivisionPrecision(result) : result;
		// return the result
		return result;
	}

	function setDivisionPrecision(result) {
        console.log(`🚀 ~ file: index.svelte ~ line 75 ~ setDivisionPrecision ~ result`, result)
        console.log(`🚀 ~ file: index.svelte ~ line 77 ~ setDivisionPrecision ~ valueA % valueB === 0 `, valueA % valueB === 0 )
		result.toFixed(3)
        console.log(`🚀 ~ file: index.svelte ~ line 78 ~ setDivisionPrecision ~ result.toFixed(3)`, result.toFixed(3))
		valueA % valueB === 0 ? result : result = result.toFixed(3)
		return result
	}

	function newRandomValues() {
		valueA = Math.ceil(Math.random() * Math.pow(10, digitsA));
		valueB = Math.ceil(Math.random() * Math.pow(10, digitsB));
		result = eval(`${valueA} ${selectedOperation.symbol} ${valueB}`);
		selectedOperation.name === 'Divide' ? (result = setDivisionPrecision(result)) : result;
	}
	function handleOperationSelect(msg) {
		console.log(
			`🚀 ~ file: index.svelte ~ line 56 ~ functiohandleOperationSelect ~ msg`,
			msg.detail
		);
		msg.detail.symbol !== '=' ? (selectedOperation = msg.detail) : false;
		processCalculation();
	}
	function handleSelect() {}
	function handleClear() {}
</script>

<div class="flex w-full h-full items-center justify-center">
	<div
		class="flex flex-col p-4 bg-winterblues-900 w-[50%] h-[50%] items-center justify-start border-2 border-lime-500 border-opacity-50"
	>
		<div class="flex flex-row text-4xl mb-4 text-amber-500 justify-around">
			<OperationsMenu on:operationSelect={handleOperationSelect} />
		</div>
		<div class="flex flex-row items-center justify-center bg-deepreds-700 bg-opacity-10">
			<label for="digitsA" class="p-2">Digits for value A </label>
			<input
				type="number"
				name="digitsA"
				bind:value={digitsA}
				class="basic-underline-number-input text-lg"
			/>
			<label for="digitsA" class="p-2">Digits for value B</label>
			<input
				type="number"
				name="digitsB"
				bind:value={digitsB}
				class="basic-underline-number-input"
			/>
			<button on:click={newRandomValues} class="p-4 bg-winterblues-800"
				>Generate random values</button
			>
		</div>

		<div class="flex flex-col justify-center">
			<div class="flex">
				<input
					type="text"
					bind:value={valueA}
					on:blur={processCalculation}
					class="text-center outline-none ring-none border-l-0 border-t-0 border-r-0 p-0 m-2 border-b-2 border-b-lime-500 bg-none bg-transparent focus:ring-0 focus:outline-none"
					placeholder="value A"
				/>
				<div class="flex flex-col items-center justify-center text-lime-500">
					<Icon icon={selectedOperation.iconname || icons.times} class="text-3xl" />
				</div>
				<input
					type="text"
					bind:value={valueB}
					on:blur={processCalculation}
					class="text-center outline-none ring-none border-l-0 border-t-0 border-r-0 p-3 m-2 border-b-2 border-b-lime-500 bg-none bg-transparent focus:ring-0 focus:outline-none"
					placeholder="value B"
				/>
				<div class="flex items-center justify-center">
					<!-- <Icon icon={icons.equal} class="text-4xl text-lime-500" /> -->
					<Icon icon={icons.equals} class="text-3xl text-lime-500" />
				</div>
				<input
					type="text"
					bind:value={result}
					class="text-center outline-none ring-none border-l-0 border-t-0 border-r-0 p-3 m-2 border-b-2 border-b-lime-500 bg-none bg-transparent focus:ring-0 focus:outline-none"
					placeholder="value C"
				/>
			</div>
		</div>
	</div>
</div>

<style lang="scss" global>
	input[type='text'] {
		outline: 2px;
		width: 8ch;
		font-size: 2.5rem;
		:focus {
			outline: none;
			border: none;
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
