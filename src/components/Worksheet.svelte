<script>
	export let sheet;
	import { page } from '$app/stores';
	import {
		selectedOperation,
		result,
		problemsPerPage,
		pageColumns,
		worksheet,
		saveWorksheetLS,
		LSgetWorksheet,
		LScheckForWorksheet
	} from '$stores/math';
	import {
		processCalculation,
		generateNewWorksheet,

		recalculateProblems
	} from '$utils/math_operations';
	import { LSgetWorksheetValuesFromDOM, setWorksheetValuesToDOM, 		resizeAllInputs,} from '$utils/dom_operations.js';


	import { afterUpdate, onMount } from 'svelte';
	import MathProblem from './MathProblem.svelte';
    let loaded = false
	$: sheet = {}
	$: exists = false;
	$: console.log(`🚀 ~ file: Worksheet.svelte ~ line 15 ~ $: sheet`, sheet);
	onMount(async () => {
		LScheckForWorksheet() ? (sheet = await LSgetWorksheet()) : (sheet = await generateNewWorksheet());
		// sheet = await generateNewWorksheet();
        loaded = true
        console.log(`🚀 ~ file: Worksheet.svelte ~ line 28 ~ onMount ~ sheet`, sheet)
        selectedOperation.set(sheet.operation);
		worksheet.set(sheet);
        await setWorksheetValuesToDOM(sheet);
        // setTimeout(() => {
            // resizeAllInputs()
        // }, 300);
	});

    afterUpdate(() => {
        if (loaded) {
            setWorksheetValuesToDOM(sheet);
            resizeAllInputs()
        }
    })
</script>

<div id="worksheet" class="flex mx-2 px-4 items-start justify-around h-full">
    {#if loaded}
	{#each Array($pageColumns) as column, i}
		<div class="flex flex-col justify-between h-full">
			{#each Array(Math.ceil($problemsPerPage / $pageColumns)) as problem, j}
				<!-- {Math.ceil($problemsPerPage / $pageColumns) * i + j + 1} -->
				<MathProblem problem={sheet.problems[Math.ceil($problemsPerPage / $pageColumns) * i + j ]} />
			{/each}
		</div>
	{/each}
    {/if}
</div>
