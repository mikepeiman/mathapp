<script>
	import { page } from '$app/stores';
import BasicCalculationForm from '$components/BasicCalculationForm.svelte';
import DigitsSettings from '$components/DigitsSettings.svelte';
import MathProblem from '$components/MathProblem.svelte';
	import MathSettings from '$components/MathSettings.svelte';
	import OperationsMenu from '$components/OperationsMenu.svelte';
import Worksheet from '$components/Worksheet.svelte';
    import { supabase } from '$lib/supabaseClient';
	import { selectedOperation, result, problemsPerPage, pageColumns, worksheet, addWorksheet, checkForWorksheet } from '$stores/math';
	import { processCalculation, generateNewWorksheetProblems, resizeAllInputs, recalculateProblems } from '$utils/math_operations';
	import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    $: sheet = []
    $: console.log(`🚀 ~ file: index.svelte ~ line 13 ~ sheet`, sheet)
	onMount(() => {
        // $result
        // console.log(`🚀 ~ file: index.svelte ~ line 4 ~ supabase`, supabase)
		console.log(`🚀 ~ file: index.svelte ~ line 14 ~ onMount ~ $result`, $result);
		console.log(`🚀 ~ file: index.svelte ~ line 19 ~ onMount ~ $pageColumns`, $pageColumns);
		// create empty array of length for value of integer $pageColumns
		const emptyArray = new Array($pageColumns);
		console.log(`🚀 ~ file: index.svelte ~ line 23 ~ onMount ~ emptyArray`, emptyArray);
		$pageColumns;
        // checkForWorksheet() ? sheet = get(worksheet) : sheet = generateNewWorksheetProblems()
        resizeAllInputs()
		// processCalculation();
	});

	function handleOperationSelect(msg) {
		console.log(`🚀 ~ file: index.svelte ~ line 10 ~ handleOperationSelect ~ msg`, msg.detail);
		msg.detail.symbol !== '=' ? selectedOperation.set(msg.detail) : false;
        recalculateProblems();
        resizeAllInputs()
	}
</script>

<div id="worksheet-layout" class="layout-main w-full h-full">
	<OperationsMenu on:operationSelect={handleOperationSelect} />
	<MathSettings />
    <Worksheet {sheet} />
</div>

<style lang="scss" global>
	#worksheet-layout {
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
