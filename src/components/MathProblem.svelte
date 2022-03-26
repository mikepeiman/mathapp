<script>
	import Icon from '@iconify/svelte';
	import { processCalculation, newRandomValues } from '$utils/math_operations';
	import { digitsA, digitsB, result, selectedOperation, valueA, valueB } from '$stores/math';
	import { onMount } from 'svelte';
	const icons = {
		times: 'fa-solid:times',
		minus: 'fa-solid:minus',
		plus: 'fa-solid:plus',
		divide: 'fa-solid:divide',
		equals: 'fa-solid:equals',
		'list-view': 'dashicons:list-view'
	};

	onMount(() => {
		let problems = document.getElementsByClassName('basic-underline-text-input');
		console.log(`🚀 ~ file: MathProblem.svelte ~ line 17 ~ onMount ~ problems`, typeof problems);
		// problems.forEach(problem => {

		// 	console.log(`🚀 ~ file: MathProblem.svelte ~ line 20 ~ onMount ~ problem`, problem)
		// });
		Object.keys(problems).forEach((i) => {
			console.log(`🚀 ~ file: MathProblem.svelte ~ line 20 ~ onMount ~ problem`, problems[i].value);
			problems[i].addEventListener('input', resizeInput);
			resizeInput.call(problems[i]);
		});
	});

	function calculate() {
		console.log(`🚀 ~ file: BasicCalculationForm.svelte ~ line 18 ~ calculate ~ valueA`, $valueA);
		processCalculation();
	}

	function resizeInput() {
		this.style.width = this.value.length + 2 + 'ch';
	}
</script>

<div class="flex flex-col justify-center items-center text-4xl">
	<div class="flex">
		<input
			type="text"
			bind:value={$valueA}
			on:blur={calculate}
			class="basic-underline-text-input"
			placeholder="value A"
		/>
		<div class="flex flex-col items-center justify-center text-lime-500 mx-2">
			<Icon icon={$selectedOperation.iconname || icons.times} class="text-3xl" />
		</div>
		<input
			type="text"
			bind:value={$valueB}
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
			bind:value={$result}
			class="basic-underline-text-input"
			placeholder="value C"
		/>
	</div>
</div>
