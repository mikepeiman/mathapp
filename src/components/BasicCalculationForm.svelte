<script>
	import Icon from '@iconify/svelte';
	import { processCalculation, newProblemWithRandomValues } from '$utils/math_operations';
	import { digitsA, digitsB, result, selectedOperation, valueA, valueB } from '$stores/math';
	const icons = {
		times: 'fa-solid:times',
		minus: 'fa-solid:minus',
		plus: 'fa-solid:plus',
		divide: 'fa-solid:divide',
		equals: 'fa-solid:equals',
	};

	function calculate() {
		console.log(`🚀 ~ file: BasicCalculationForm.svelte ~ line 18 ~ calculate ~ valueA`, $valueA);
		processCalculation();
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
