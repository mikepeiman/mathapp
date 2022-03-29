<script context="module">
    import { getWorksheetsFromSupabase } from '$stores/math';
    export async function load() {
        // let res = await fetch('$api/worksheets.get.json');
        let data = await getWorksheetsFromSupabase();
        console.log(`🚀 ~ file: SideNav.svelte ~ line 4 ~ load ~ data`, data)
        return { stuff: { data }, params: { data }, props: {data } }
    }
</script>
<script>
	import { page } from '$app/stores';
	import BasicCalculationForm from '$components/BasicCalculationForm.svelte';
	import DigitsSettings from '$components/DigitsSettings.svelte';
	import MathProblem from '$components/MathProblem.svelte';
	import MathSettings from '$components/MathSettings.svelte';
	import OperationsMenu from '$components/OperationsMenu.svelte';
	import Worksheet from '$components/Worksheet.svelte';
	import { supabase } from '$lib/supabaseClient';
	import {
		selectedOperation,
	} from '$stores/math';
	import {   recalculateProblems } from '$utils/math_operations';
	import { resizeAllInputs } from '$utils/dom_operations'

	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	$: sheet = [];
	$: console.log(`🚀 ~ file: index.svelte ~ line 13 ~ sheet`, sheet);
	onMount(() => {
        console.log(`🚀 ~ file: index.svelte ~ line 39 ~ onMount ~ $page`, $page)
		console.log(`🚀 ~ file: index.svelte ~ line 17 ~ onMount ~ onMount - sheet`, sheet);
		resizeAllInputs();
	});

	function handleOperationSelect(msg) {
		console.log(`🚀 ~ file: index.svelte ~ line 10 ~ handleOperationSelect ~ msg`, msg.detail);
		msg.detail.symbol !== '=' ? selectedOperation.set(msg.detail) : false;
		recalculateProblems();
		resizeAllInputs();
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
