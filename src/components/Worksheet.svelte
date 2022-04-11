<script>
	export let sheet;
	import {
		problemsPerPage,
		pageColumns,
		worksheet,
		LSgetWorksheet,
		LScheckForWorksheet,
		loadWorksheet,
		saveWorksheetLS
	} from '$stores/math';
	import { generateNewWorksheet, newProblemWithRandomValues } from '$utils/math_operations';
	import { setWorksheetValuesToDOM, resizeAllInputs } from '$utils/dom_operations.js';

	import { afterUpdate, onMount } from 'svelte';
	import MathProblem from './MathProblem.svelte';
	let loaded = false;
	$: sheet = $worksheet || {};
	$: saved = $worksheet.saved || false;
	// $: console.log(`🚀 ~ file: Worksheet.svelte ~ line 15 ~ $: sheet`, sheet);
	// $: console.log(`🚀 ~ file: Worksheet.svelte ~ line 33 ~ $: saved`, saved);
	onMount(async () => {
		// console.log(
		// 	`🚀 ~ file: Worksheet.svelte ~ line 38 ~ onMount ~ LScheckForWorksheet()`,
		// 	LScheckForWorksheet()
		// );

		LScheckForWorksheet()
			? (sheet = await LSgetWorksheet())
			: (sheet = await generateNewWorksheet());
		// sheet = await generateNewWorksheet();
		loaded = true;
		// console.log(`🚀 ~ file: Worksheet.svelte ~ line 28 ~ onMount ~ sheet`, sheet);
		saved = sheet.saved;
		loadWorksheet(sheet);
		// selectedOperation.set(sheet.operation);
		// worksheet.set(sheet);
		// pageColumns.set(sheet.columns);
		// problemsPerPage.set(sheet.problems.length);
		await setWorksheetValuesToDOM(sheet);
		// setTimeout(() => {
		// resizeAllInputs()
		// }, 300);
	});

	function updateSheetProblems() {
		if(sheet.problems.length < $problemsPerPage){
			let diff = $problemsPerPage - sheet.problems.length;
			for (let i = 0; i < diff; i++) {
				let problem = newProblemWithRandomValues();
                console.log(`🚀 ~ file: Worksheet.svelte ~ line 51 ~ updateSheetProblems ~ problem`, problem)
				sheet.problems.push(newProblemWithRandomValues());
			}
		} else if(sheet.problems.length > $problemsPerPage){
			let diff = sheet.problems.length - $problemsPerPage;
			for (let i = 0; i < diff; i++) {
				sheet.problems.pop();
			}
		}
		worksheet.set(sheet);
	}

	afterUpdate(() => {
		if (loaded) {
			console.log(`🚀 ~ file: Worksheet.svelte ~ line 47 ~ afterUpdate ~ loaded`, );
			sheet.columns = $pageColumns;
			updateSheetProblems()
			saveWorksheetLS();
			setWorksheetValuesToDOM(sheet);
			resizeAllInputs();
		}
	});
</script>

<!-- {#if saved}
	<h2 class="absolute bottom-6 text-greenge-200">
		Worksheet saved, Supabase ID: {sheet.id} - LS XID: {sheet.xid}
	</h2>
{:else}
	<h2 class="absolute bottom-6 text-red-500">
		Worksheet not saved, Supabase ID: {sheet.id} - LS XID: {sheet.xid}
	</h2>
{/if} -->
<div id="worksheet" class="flex mx-2 px-4 items-start justify-around h-full">
	{#if loaded}
		<div class="flex flex-col pb-40 h-full w-full">
			{#each Array(Math.ceil($problemsPerPage / $pageColumns)) as row, i}
				<!-- {#if i > 0}<div class="bg-gray-600 h-2 mx-2 w-full" />{/if} -->
				<div class="flex flex-row justify-start h-full ">
					{#each Array(Math.ceil($problemsPerPage / Math.ceil($problemsPerPage / $pageColumns))) as column, j}
						{#if j > 0}<div class="bg-sky-600 w-2 mx-2 h-16 self-center rounded" />{/if}
						<MathProblem
							problem={sheet.problems[
								Math.ceil($problemsPerPage / Math.ceil($problemsPerPage / $pageColumns)) * i + j
							]}
							i={Math.ceil($problemsPerPage / Math.ceil($problemsPerPage / $pageColumns)) * i + j}
						/>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>
