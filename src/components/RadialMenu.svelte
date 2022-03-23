<script>
	import Icon from '@iconify/svelte';
$: selectedOperation = ''
$: console.log(`🚀 ~ file: RadialMenu.svelte ~ line 4 ~ selectedOperation`, selectedOperation)

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
		console.log(
			`🚀 ~ file: RadialMenu.svelte ~ line 33 ~ operationSelector ~ operation`,
			operation
		);
        selectedOperation = operation
	}
</script>

{#each operations as operation}
	<!-- <div class="btn" on:click={() => operationSelect(operation)} /> -->
	<!-- <i class="fas" :class="operation.iconname" v-model="selectedOperation"></i> -->
	<div class="p-2 bg-winterblues-800 rounded-full {selectedOperation.name === operation.name ? 'bg-red-500' : ''} transition-all"  on:click={() => operationSelect(operation)}>
		<Icon icon={operation.iconname} />
	</div>
{/each}
