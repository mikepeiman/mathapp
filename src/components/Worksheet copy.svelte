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
	import { generateNewWorksheet } from '$utils/math_operations';
	import { setWorksheetValuesToDOM, resizeAllInputs } from '$utils/dom_operations.js';

	import { afterUpdate, onMount } from 'svelte';
	import MathProblem from './MathProblem.svelte';
	let loaded = false;
	$: sheet = $worksheet || {};
	$: saved = $worksheet.saved || false;
	$: console.log(`🚀 ~ file: Worksheet.svelte ~ line 15 ~ $: sheet`, sheet);
	$: console.log(`🚀 ~ file: Worksheet.svelte ~ line 33 ~ $: saved`, saved);
	onMount(async () => {
		console.log(
			`🚀 ~ file: Worksheet.svelte ~ line 38 ~ onMount ~ LScheckForWorksheet()`,
			LScheckForWorksheet()
		);

		LScheckForWorksheet()
			? (sheet = await LSgetWorksheet())
			: (sheet = await generateNewWorksheet());
		// sheet = await generateNewWorksheet();
		loaded = true;
		console.log(`🚀 ~ file: Worksheet.svelte ~ line 28 ~ onMount ~ sheet`, sheet);
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

	afterUpdate(() => {
		if (loaded) {
			console.log(`🚀 ~ file: Worksheet.svelte ~ line 47 ~ afterUpdate ~ loaded`, loaded);
			sheet.columns = $pageColumns;
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
		<!-- <div class="flex flex-col justify-start h-full mb-24">
			{#each Array($problemsPerPage) as problem, index}
			<div class="flex">
				{#each Array($pageColumns) as column, c}
				<div class="flex">
					<div class="bg-fuchsia-700 p-1 rounded">{i}:{index}={(i + 1) * (index + 1)}</div>
					<div class="bg-red-900 p-1 rounded">{index+1} % {c+1} =</div>
					<div class="bg-green-900 p-1 rounded">{(index + 1) % (c+1)}</div>
					<div class="bg-emerald-700 p-1 rounded">{(index + 1) * (c+1)}</div>
					<div class="bg-emerald-700 p-1 rounded">{sheet.problems.length}/{$pageColumns}</div>
					<div class="bg-sky-800 p-1 rounded">{Math.ceil(sheet.problems.length / $pageColumns) }</div>
				</div>
				<MathProblem {problem} i={index} />
				{/each}
			</div> -->
		<div class="flex pb-40 h-full">
			{#each Array($pageColumns) as column, i}
			{#if i > 0}<div class="bg-gray-600 w-2 mx-2 h-full" />{/if}
				<div class="flex flex-col justify-start h-full ">
					{#each Array(Math.ceil($problemsPerPage / $pageColumns)) as problem, j}
						<!-- <div class="flex">
			
					<div class="bg-fuchsia-700 p-1 rounded">		{i+1}:{j+1}</div>
					<div class="bg-red-900 p-1 rounded">{Math.ceil($problemsPerPage / $pageColumns) * j + i + 1}</div>
					<div class="bg-green-900 p-1 rounded">{Math.ceil($problemsPerPage / $pageColumns) * i +  j + 1}</div>
					<div class="bg-blue-900 p-1 rounded">{$problemsPerPage}</div>
				</div> -->
						<!-- {Math.ceil($problemsPerPage / $pageColumns) * i + j + 1} -->
						<MathProblem
							problem={sheet.problems[Math.ceil($problemsPerPage / $pageColumns) * i + j]}
							i={Math.ceil($problemsPerPage / $pageColumns) * i + j}
						/>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>
