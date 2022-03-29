<script>
	import Icon from '@iconify/svelte';
	import { processCalculation } from '$utils/math_operations';
	import { selectedOperation } from '$stores/math';
	import { onMount } from 'svelte';
	const icons = {
		times: 'fa-solid:times',
		minus: 'fa-solid:minus',
		plus: 'fa-solid:plus',
		divide: 'fa-solid:divide',
		equals: 'fa-solid:equals'
	};
	let valueA, valueB, result;
	export let problem = {};
	onMount(() => {
		// console.log(`🚀 ~ file: MathProblem.svelte ~ line 16 ~ problem`, problem)
	});

	function calculate() {
		console.log(`🚀 ~ file: MathProblem.svelte ~ line 21 ~ calculate ~ problem`, problem);
		let a = problem.valueA;
		let b = problem.valueB;
		let operation = $selectedOperation;
		problem.result = processCalculation(a, b, operation);
	}

	function updateDataAttributes() {
		
	}
	function inputOnChange() {
		this.value
        console.log(`🚀 ~ file: MathProblem.svelte ~ line 32 ~ inputOnChange ~ this.value`, this.value)
		resizeInput()
	}

	function resizeInput() {
		this.value ? (this.style.width = this.value.length + 2 + 'ch') : (this.style.width = '1ch');
	}
</script>

<div class="flex flex-col justify-center items-start text-4xl">
	<div class="math-problem flex">
		<input
			type="text"
			name="valueA"
			bind:value={problem.valueA}
			on:blur={calculate}
			class="basic-underline-text-input"
			placeholder="value A"
		/>
		<div class="flex flex-col items-center justify-center text-lime-500 mx-2">
			<Icon icon={$selectedOperation.iconname || icons.times} class="text-2xl" />
		</div>
		<input
			type="text"
			name="valueB"
			bind:value={problem.valueB}
			on:blur={calculate}
			class="basic-underline-text-input"
			placeholder="value B"
		/>
		<div on:click={calculate} class="flex items-center justify-center mx-2">
			<!-- <Icon icon={icons.equal} class="text-4xl text-lime-500" /> -->
			<Icon icon={icons.equals} class="text-2xl text-lime-500 " />
		</div>
		<input
			type="text"
			name="result"
			bind:value={problem.result}
			on:change={inputOnChange}
			class="basic-underline-text-input"
			placeholder="value C"
		/>
	</div>
</div>
