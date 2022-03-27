<script>
	export let sheet;
	import {
		selectedOperation,
		result,
		problemsPerPage,
		pageColumns,
		worksheet,
		addWorksheet,
		getWorksheet,
		checkForWorksheet
	} from '$stores/math';
	import { processCalculation, generateNewWorksheetProblems, resizeAllInputs, recalculateProblems } from '$utils/math_operations';

	import { onMount } from 'svelte';
	import MathProblem from './MathProblem.svelte';
	$: sheet = [];
	$: exists = false;
	$: console.log(`🚀 ~ file: Worksheet.svelte ~ line 15 ~ sheet`, sheet);
	onMount(() => {
		checkForWorksheet() ? (sheet = getWorksheet()) : (sheet = generateNewWorksheetProblems());
	});
</script>

<div id="worksheet" class="flex mx-2 px-4 items-start justify-around h-full">
	{#each Array($pageColumns) as column, i}
		<div class="flex flex-col justify-between h-full">
			{#each Array(Math.ceil($problemsPerPage / $pageColumns)) as problem, j}
				<MathProblem />
			{/each}
		</div>
	{/each}
</div>
