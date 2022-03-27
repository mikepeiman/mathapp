<script>
	import Icon from '@iconify/svelte';
	import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
	import { get } from 'svelte/store';
	import { selectedOperation, worksheet, getWorksheet } from '$stores/math.js';
	const dispatch = createEventDispatcher();
	// $: selectedOperation = '';
	let sheet = {}
	$: current = sheet['operation'] ? sheet['operation']  : operations[0];

	onMount(() => {
		sheet = getWorksheet()
		console.log(`🚀 ~ file: OperationsMenu.svelte ~ line 12 ~ onMount `);
	});



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

	function operationSelect(operation) {
		operation.symbol !== '=' ? selectedOperation.set(operation) : false;
		operation.symbol !== '=' ? (current = operation) : false;
		dispatch('operationSelect', operation);
		selectedOperation.set(operation);
	}
</script>

<div
	id="operations-menu"
	class="flex flex-row w-full text-4xl mb-4 text-amber-500 items-center justify-center"
>
	{#each operations as operation}
		<!-- <div class="btn" on:click={() => operationSelect(operation)} /> -->
		<!-- <i class="fas" :class="operation.iconname" v-model="selectedOperation"></i> -->
		<div
			class="p-2 mx-4 w-16 h-16 flex items-center justify-center bg-winterblues-800 rounded-full {current.name ===
			operation.name
				? 'bg-red-500'
				: ''} transition-all"
			on:click={() => operationSelect(operation)}
		>
			<Icon icon={operation.iconname} />
		</div>
	{/each}
</div>
