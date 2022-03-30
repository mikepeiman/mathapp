<script>
	import Icon from '@iconify/svelte';
	import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
	import { get } from 'svelte/store';
	import { selectedOperation, worksheet, LSgetWorksheet } from '$stores/math.js';
	const dispatch = createEventDispatcher();
	// $: selectedOperation = '';
	let sheet = {}
	$: current = sheet['operation'] ? sheet['operation']  : operations[3];

	onMount(() => {
		sheet = LSgetWorksheet("current")
        console.log(`🚀 ~ file: OperationsMenu.svelte ~ line 13 ~ onMount ~ sheet`, sheet)
        console.log(`🚀 ~ file: OperationsMenu.svelte ~ line 15 ~ onMount ~ current`, current)
		dispatch('operationSelect', current);
		console.log(`🚀 ~ file: OperationsMenu.svelte ~ line 12 ~ onMount `);
	});



	export const operations = [
		{
			name: 'mixed operations',
			symbol: '?',
			iconname: 'fa-solid:question'
		},
		{
			name: 'addition',
			symbol: '+',
			iconname: 'fa-solid:plus'
		},
		{
			name: 'subtraction',
			symbol: '-',
			iconname: 'fa-solid:minus'
		},
		{
			name: 'multiplication',
			symbol: '*',
			iconname: 'fa-solid:times'
		},
		{
			name: 'division',
			symbol: '/',
			iconname: 'fa-solid:divide'
		},
		{
			name: 'equals',
			symbol: '=',
			iconname: 'fa-solid:equals'
		},
		// {
		// 	name: 'Random',
		// 	symbol: '?',
		// 	iconname: 'ant-design:question-circle-outlined'
		// },
		// {
		// 	name: 'Random',
		// 	symbol: '?',
		// 	iconname: 'bi:question-circle-fill'
		// },
		// {
		// 	name: 'Random',
		// 	symbol: '?',
		// 	iconname: 'ep:question-filled'
		// },
		// {
		// 	name: 'Random',
		// 	symbol: '?',
		// 	iconname: 'fa:question'
		// },
		// {
		// 	name: 'Random',
		// 	symbol: '?',
		// 	iconname: 'emojione-monotone:question-mark'
		// },

	];

	function operationSelect(operation) {
        console.log(`🚀 ~ file: OperationsMenu.svelte ~ line 48 ~ operationSelect ~ operation`, operation)
		operation.symbol !== '=' ? selectedOperation.set(operation) : false;
		operation.symbol !== '=' ? (current = operation) : false;
		operation ? dispatch('operationSelect', operation) : dispatch('operationSelect', current);
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
				? 'bg-fuchsia-800'
				: ''} transition-all"
			on:click={() => operationSelect(operation)}
		>
			<Icon icon={operation.iconname} />
		</div>
	{/each}
</div>
