<script>
	import { page } from '$app/stores';

	import BasicCalculationForm from '$components/BasicCalculationForm.svelte';
	import DigitsSettings from '$components/DigitsSettings.svelte';
	import MathSettings from '$components/MathSettings.svelte';
	import OperationsMenu from '$components/OperationsMenu.svelte';
	import { selectedOperation, result, problemsPerPage, pageColumns } from '$stores/math';
	import { processCalculation, newRandomValues } from '$utils/math_operations';
	import { onMount } from 'svelte';

	onMount(() => {
		// $result
		console.log(`🚀 ~ file: index.svelte ~ line 14 ~ onMount ~ $result`, $result);
		console.log(`🚀 ~ file: index.svelte ~ line 19 ~ onMount ~ $pageColumns`, $pageColumns);
		// create empty array of length for value of integer $pageColumns
		const emptyArray = new Array($pageColumns);
		console.log(`🚀 ~ file: index.svelte ~ line 23 ~ onMount ~ emptyArray`, emptyArray);
		$pageColumns;
		newRandomValues();
		// processCalculation();
	});

	function handleOperationSelect(msg) {
		console.log(`🚀 ~ file: index.svelte ~ line 10 ~ handleOperationSelect ~ msg`, msg.detail);
		msg.detail.symbol !== '=' ? selectedOperation.set(msg.detail) : false;
		processCalculation();
	}
</script>

<div id="default-layout" class="layout-main w-full h-full">
	<OperationsMenu on:operationSelect={handleOperationSelect} />
	<MathSettings />
	<div id="worksheet" class="flex mx-2 items-start justify-around">
        {#each Array($pageColumns) as column, i}
            <div  class="flex flex-col">
                {#each Array($problemsPerPage) as problem, j}
                    <BasicCalculationForm />
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="scss" global>
	#default-layout {
		display: grid;
		grid-area: layout-main;
		grid-template-columns: 1fr 18rem;
		grid-template-rows: 15% 1fr;
		grid-template-areas:
			'operations-menu settings'
			'worksheet settings';
	}

	#settings {
		grid-area: settings;
	}

	#worksheet {
		grid-area: worksheet;
	}

	#operations-menu {
		grid-area: operations-menu;
		margin-top: 2rem;
	}
</style>
