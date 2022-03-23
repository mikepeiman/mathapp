<script>
	import OperationsMenu from '$components/OperationsMenu.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import Select from 'svelte-select';

	let icons = {
		multiply: 'majesticons:multiply',
		divide: 'majesticons:divide',
		plus: 'majesticons:plus',
		minus: 'majesticons:minus',
		equal: 'fa-solid:equals',
		close: 'majesticons:close'
	};

	let operations = [
		{ value: 'multiply', label: 'Multiply' },
		{ value: 'divide', label: 'Divide' },
		{ value: 'plus', label: 'Plus' },
		{ value: 'minus', label: 'Minus' }
	];

	$: selectedOperation = ''

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

	function processCalculation() {

		// get the result
		result = eval(`${valueA} ${selectedOperation.symbol} ${valueB}`);
		// selectedOperation.name === "Divide" ? result = result.toFixed(3) : result = result.toFixed(0);
		selectedOperation.name === "Divide" ? setDivisionPrecision(result) : result
        console.log(`🚀 ~ file: index.svelte ~ line 50 ~ processCalculation ~ result`, result)
	}
	
	function setDivisionPrecision(result) {
		return valueA % valueB === 0 ? result : result = result.toFixed(3);
	}

	function newRandomValues() {
		valueA = Math.ceil(Math.random() * 100);
		valueB = Math.ceil(Math.random() * 100);
		result = eval(`${valueA} ${selectedOperation.symbol} ${valueB}`)
		selectedOperation.name === "Divide" ? result = setDivisionPrecision(result) : result
	}
	function handleOperationSelect(msg) {
		console.log(
			`🚀 ~ file: index.svelte ~ line 56 ~ functiohandleOperationSelect ~ msg`,
			msg.detail
		);
		selectedOperation = msg.detail;
		processCalculation()
	}
	function handleSelect() {}
	function handleClear() {}
</script>

<div class="flex w-full h-full items-center justify-center">
	<div
		class="flex flex-col p-4 bg-winterblues-900 w-[50%] h-[50%] items-center justify-center border-2 border-lime-500 border-opacity-50"
	>
		<button on:click={newRandomValues} class="p-4 bg-winterblues-800">New values</button>
		<div class="flex">
			<input
				type="text"
				bind:value={valueA}
				on:blur={processCalculation}
				class="text-center outline-none ring-none border-l-0 border-t-0 border-r-0 p-0 m-2 border-b-2 border-b-lime-500 bg-none bg-transparent focus:ring-0 focus:outline-none"
				placeholder="value A"
			/>
			<div class="flex flex-col items-center justify-center">
				<OperationsMenu on:operationSelect={handleOperationSelect} />
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
				<Icon icon={icons.equal2} class="text-2xl text-lime-500" />
			</div>
			<input
				type="text"
				bind:value={result}
				class="text-center outline-none ring-none border-l-0 border-t-0 border-r-0 p-3 m-2 border-b-2 border-b-lime-500 bg-none bg-transparent focus:ring-0 focus:outline-none"
				placeholder="value C"
			/>
		</div>
		<button on:click={processCalculation} class="p-4 bg-limegreens-400">Calculate</button>
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
</style>
