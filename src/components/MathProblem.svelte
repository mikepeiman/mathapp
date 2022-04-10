<script>
	import Icon from '@iconify/svelte';
	import { processCalculation } from '$utils/math_operations';
	import { resizeInput, resizeAllInputs } from '$utils/dom_operations';
	import { selectedOperation, randomizeOperations, worksheet, saveWorksheetLS } from '$stores/math';
	import { onMount } from 'svelte';
	const icons = {
		times: 'fa-solid:times',
		minus: 'fa-solid:minus',
		plus: 'fa-solid:plus',
		divide: 'fa-solid:divide',
		equals: 'fa-solid:equals'
	};
	let valueA, valueB, result;
	$: sheet = $worksheet;
	
	export let problem = {}, i = 0
	// $: console.log(`🚀 ~ file: MathProblem.svelte ~ line 18 ~ $: problem.op - `, problem.op)
	
	onMount(() => {
		// console.log(`🚀 ~ file: MathProblem.svelte ~ line 16 ~ onMount problem.op `, problem.op);
	});
	
	function calculate() {
		console.log(`🚀 ~ file: MathProblem.svelte ~ line 19 ~ i`, i)
		console.log(`🚀 ~ file: MathProblem.svelte ~ line 16 ~ sheet`, sheet)
		let a = problem.valueA;
		let b = problem.valueB;
		let operation = problem.op;
		problem.result = processCalculation(a, b, operation);	
		let inputs = Array.from(this.children).filter(child => child.nodeName === 'INPUT');
		let resultInput = inputs.find(input => input.name === 'result');
		resultInput.value = problem.result;
		resultInput.setAttribute("data-value", problem.result)
		inputs.forEach(input => {
			resizeInput.call(input);
		});
		sheet.problems[i] = problem
		worksheet.set(sheet)
		saveWorksheetLS()
	}

	function updateDataAttributes() {}

	// function resizeInput() {
	// 	this.value ? (this.style.width = this.value.length + 2 + 'ch') : (this.style.width = '1ch');
	// }

	function getIcon() {
		// return $randomizeOperations ? problem.op.iconname : $selectedOperation.iconname;
		// console.log(`🚀 ~ file: MathProblem.svelte ~ line 40 ~ getIcon ~ problem.op.iconname `, problem?.op?.iconname )
		return problem.op.iconname;
	}
</script>
{#if problem?.op}
<div class="flex flex-col justify-center items-start text-4xl">
	<div class="math-problem flex" on:change={calculate}>
		<input
			type="number"
			name="valueA"
			bind:value={problem.valueA}
			class="basic-underline-text-input"
			placeholder="value A"
		/>
		<div class="flex flex-col items-center justify-center text-lime-500 mx-2">
			<Icon icon={problem.op?.iconname} name="operation-icon" class="text-2xl" />
			<!-- <Icon icon={$selectedOperation.iconname || icons.times} class="text-2xl" /> -->
		</div>
		<input
			type="number"
			name="valueB"
			bind:value={problem.valueB}
			class="basic-underline-text-input"
			placeholder="value B"
		/>
		<div class="flex items-center justify-center mx-2">
			<!-- <Icon icon={icons.equal} class="text-4xl text-lime-500" /> -->
			<Icon icon={icons.equals} class="text-2xl text-lime-500 " />
		</div>
		<input
			type="number"
			name="result"
			bind:value={problem.result}
			class="basic-underline-text-input"
		/>
	</div>
</div>
{/if}
<style lang="scss">
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
