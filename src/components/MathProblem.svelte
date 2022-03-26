<script>
	import Icon from '@iconify/svelte';
	import { processCalculation, newRandomValues, generateNewWorksheetProblems } from '$utils/math_operations';
	import { selectedOperation } from '$stores/math';
	import { onMount } from 'svelte';
	const icons = {
		times: 'fa-solid:times',
		minus: 'fa-solid:minus',
		plus: 'fa-solid:plus',
		divide: 'fa-solid:divide',
		equals: 'fa-solid:equals',
		'list-view': 'dashicons:list-view'
	};
	let valueA, valueB, result;

	onMount(() => {
		generateNewWorksheetProblems()
	});

	// function generateNewWorksheetProblems() {
	// 	let problems = document.getElementsByClassName('math-problem');
	// 	Object.keys(problems).forEach((i) => {
	// 		let problem = problems[i];
	// 		// console.log(`🚀 ~ file: MathProblem.svelte ~ line 26 ~ Object.keys ~ problem`, problem);
	// 		let inputs = problem.children;
	// 		inputs = Array.from(inputs);
	// 		inputs = inputs.filter((input) => input.tagName === 'INPUT');
	// 		// console.log(`🚀 ~ file: MathProblem.svelte ~ line 28 ~ Object.keys ~ inputs`, inputs);
	// 		let values = newRandomValues();
	// 		// let inputs = problem.getElementsByClassName('basic-underline-text-input');

	// 		// Object.keys(inputs).forEach((i) => {
	// 		Array.from(inputs).forEach((input, i) => {
	// 			// console.log(`🚀 ~ file: MathProblem.svelte ~ line 35 ~ Array.from ~ input`, input)
	// 			// inputs.forEach((i) => {
	// 			// console.log(`🚀 ~ file: MathProblem.svelte ~ line 20 ~ onMount ~ problem`, problems[i].value);
	// 			// console.log(`🚀 ~ file: MathProblem.svelte ~ line 39 ~ inputs.forEach ~ i`, i);
	// 			input.value = values[i];
	// 			// console.log(`🚀 ~ file: MathProblem.svelte ~ line 32 ~ Object.keys ~ values[i]`, values[i]);
	// 			inputs[i].addEventListener('change', resizeInput);
	// 			inputs[i].addEventListener('input', resizeInput);
	// 			resizeInput.call(inputs[i]);
	// 		});
	// 	});
	// }

	function calculate() {
		// console.log(`🚀 ~ file: BasicCalculationForm.svelte ~ line 18 ~ calculate ~ valueA`, $valueA);
		processCalculation();
	}

	function resizeInput() {
		this.value ? (this.style.width = this.value.length + 2 + 'ch') : (this.style.width = '1ch');
	}
</script>

<div class="flex flex-col justify-center items-start text-4xl">
	<div class="math-problem  flex">
		<input
			type="text"
			name="valueA"
			bind:value={valueA}
			on:blur={calculate}
			class="basic-underline-text-input"
			placeholder="value A"
		/>
		<div class="flex flex-col items-center justify-center text-lime-500 mx-2">
			<Icon icon={$selectedOperation.iconname || icons.times} class="text-3xl" />
		</div>
		<input
			type="text"
			name="valueB"
			bind:value={valueB}
			on:blur={calculate}
			class="basic-underline-text-input"
			placeholder="value B"
		/>
		<div on:click={calculate} class="flex items-center justify-center mx-2">
			<!-- <Icon icon={icons.equal} class="text-4xl text-lime-500" /> -->
			<Icon icon={icons.equals} class="text-3xl text-lime-500 " />
		</div>
		<input
			type="text"
			name="result"
			bind:value={result}
			class="basic-underline-text-input"
			placeholder="value C"
		/>
	</div>
</div>
