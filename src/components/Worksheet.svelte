<script>
	export let sheet;
	import { page } from '$app/stores';
    import { get } from 'svelte/store'
	import {
		selectedOperation,
		result,
		problemsPerPage,
		pageColumns,
		worksheet,
		saveWorksheetLS,
		LSgetWorksheet,
		LScheckForWorksheet,
        worksheetSaved,
loadWorksheet
	} from '$stores/math';
	import {
		processCalculation,
		generateNewWorksheet,
		recalculateProblems
	} from '$utils/math_operations';
	import {
		LSgetWorksheetValuesFromDOM,
		setWorksheetValuesToDOM,
		resizeAllInputs
	} from '$utils/dom_operations.js';

	import { afterUpdate, onMount } from 'svelte';
	import MathProblem from './MathProblem.svelte';
	let loaded = false;
	$: sheet = $worksheet || {};
	$: exists = false;
    $: saved = $worksheet.saved || false
	$: console.log(`🚀 ~ file: Worksheet.svelte ~ line 15 ~ $: sheet`, sheet);
    $: console.log(`🚀 ~ file: Worksheet.svelte ~ line 33 ~ $: saved`, saved)
	onMount(async () => {
        console.log(`🚀 ~ file: Worksheet.svelte ~ line 38 ~ onMount ~ LScheckForWorksheet()`, LScheckForWorksheet())

		LScheckForWorksheet()
			? (sheet = await LSgetWorksheet())
			: (sheet = await generateNewWorksheet());
		// sheet = await generateNewWorksheet();
		loaded = true;
		console.log(`🚀 ~ file: Worksheet.svelte ~ line 28 ~ onMount ~ sheet`, sheet);
        saved = sheet.saved
        loadWorksheet(sheet)
		// selectedOperation.set(sheet.operation);
		// worksheet.set(sheet);
        // pageColumns.set(sheet.columns);
        // problemsPerPage.set(sheet.problems.length);
		await setWorksheetValuesToDOM(sheet);
		// setTimeout(() => {
		// resizeAllInputs()
		// }, 300);
	});

	afterUpdate(() => {
		if (loaded) {
			setWorksheetValuesToDOM(sheet);
			resizeAllInputs();
		}
	});
</script>

{#if saved}
<h2 class="absolute bottom-6 text-greenge-200">Worksheet saved, Supabase ID: {sheet.id} - LS XID: {sheet.xid}</h2>
{:else}
<h2 class="absolute bottom-6 text-red-500">Worksheet not saved, Supabase ID: {sheet.id} - LS XID: {sheet.xid}</h2>
{/if}
<div id="worksheet" class="flex mx-2 px-4 items-start justify-around h-full">
	{#if loaded}
		{#each Array($pageColumns) as column, i}
			<div class="flex flex-col justify-start h-full">
				{#each Array(Math.ceil($problemsPerPage / $pageColumns)) as problem, j}
					<!-- {Math.ceil($problemsPerPage / $pageColumns) * i + j + 1} -->
					<MathProblem
						problem={sheet.problems[Math.ceil($problemsPerPage / $pageColumns) * i + j]}
                        i={Math.ceil($problemsPerPage / $pageColumns) * i + j}
					/>
				{/each}
			</div>
		{/each}
	{/if}
</div>
