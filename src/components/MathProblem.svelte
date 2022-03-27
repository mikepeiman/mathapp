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
		equals: 'fa-solid:equals',
		'list-view': 'dashicons:list-view'
	};
	let valueA, valueB, result;
	export let problem = {}
	onMount(() => {
		// console.log(`🚀 ~ file: MathProblem.svelte ~ line 16 ~ problem`, problem)
		// setWorksheetValuesToDOM()
	});

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
			bind:value={problem.valueA}
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
			bind:value={problem.valueB}
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
			bind:value={problem.result}
			class="basic-underline-text-input"
			placeholder="value C"
		/>
	</div>
</div>
