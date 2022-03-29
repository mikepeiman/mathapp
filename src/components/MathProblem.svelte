<script>
	import Icon from '@iconify/svelte';
	import { processCalculation } from '$utils/math_operations';
	import { resizeAllInputs } from '$utils/dom_operations';
	import { selectedOperation, randomizeOperations, worksheet } from '$stores/math';
	import { onMount } from 'svelte';
	const icons = {
		times: 'fa-solid:times',
		minus: 'fa-solid:minus',
		plus: 'fa-solid:plus',
		divide: 'fa-solid:divide',
		equals: 'fa-solid:equals'
	};
	let valueA, valueB, result;
	$: sheet = $worksheet

	export let problem = {};
    $: console.log(`🚀 ~ file: MathProblem.svelte ~ line 18 ~ $: problem.op - `, problem.op)

	onMount(() => {
		console.log(`🚀 ~ file: MathProblem.svelte ~ line 16 ~ onMount problem.op `, problem.op);
	});

	function calculate() {
		console.log(`🚀 ~ file: MathProblem.svelte ~ line 21 ~ calculate ~ problem`, problem);
		let a = problem.valueA;
		let b = problem.valueB;
		let operation = $randomizeOperations ? problem.op : $selectedOperation;
		problem.result = processCalculation(a, b, operation);
		resizeAllInputs();
	}

	function updateDataAttributes() {}

	function resizeInput() {
		this.value ? (this.style.width = this.value.length + 2 + 'ch') : (this.style.width = '1ch');
	}

	function getIcon() {
		// return $randomizeOperations ? problem.op.iconname : $selectedOperation.iconname;
        // console.log(`🚀 ~ file: MathProblem.svelte ~ line 40 ~ getIcon ~ problem.op.iconname `, problem?.op?.iconname )
		return problem.op.iconname 
	}
</script>

<div class="flex flex-col justify-center items-start text-4xl">
	<div class="math-problem flex" on:change={calculate}>
		{getIcon()}
		<input
			type="text"
			name="valueA"
			bind:value={problem.valueA}
			on:blur={calculate}
			class="basic-underline-text-input"
			placeholder="value A"
		/>
		<div class="flex flex-col items-center justify-center text-lime-500 mx-2">
			<Icon icon={getIcon()} class="text-2xl" />
			<!-- <Icon icon={$selectedOperation.iconname || icons.times} class="text-2xl" /> -->
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
			class="basic-underline-text-input"
			placeholder="value C"
		/>
	</div>
</div>
