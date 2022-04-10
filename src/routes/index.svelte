<script context="module">
	import { getWorksheetsFromSupabase } from '$stores/math';
	export async function load() {
		// const {params} = page.params
		console.log(`🚀 ~ file: index.svelte ~ line 5 ~ load ~ page hash`, page);

		// console.log(`🚀 ~ file: index.svelte ~ line 5 ~ load ~ params`, params)
		// let res = await fetch('$api/worksheets.get.json');
		let data = await getWorksheetsFromSupabase();
		return { stuff: { data }, params: { data }, props: { data } };
	}
</script>

<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import BasicCalculationForm from '$components/BasicCalculationForm.svelte';
	import DigitsSettings from '$components/DigitsSettings.svelte';
	import MathProblem from '$components/MathProblem.svelte';
	import MathSettings from '$components/MathSettings.svelte';
	import OperationsMenu from '$components/OperationsMenu.svelte';
	import Worksheet from '$components/Worksheet.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { selectedOperation } from '$stores/math';
	import { token, tokenStore } from '$stores/auth';
	import { recalculateProblems } from '$utils/math_operations';
	import { resizeAllInputs } from '$utils/dom_operations';

	import { onMount, beforeUpdate } from 'svelte';
	import { get } from 'svelte/store';
	// $page
	$: console.log(`🚀 ~ file: index.svelte ~ line 30 ~ $page`, $page);
	let parsedHash,
		urlHashObject = {};
	$: console.log(`🚀 ~ file: index.svelte ~ line 7 ~ load ~ parsedHash`, parsedHash);

	beforeUpdate(() => {
		handleUrlHash();
	});

	onMount(() => {
		let sheets = $page.stuff.data;

		console.log(`🚀 ~ file: index.svelte ~ line 28 ~ onMount ~ sheets`, sheets);
		localStorage.setItem('worksheets', JSON.stringify(sheets));
		resizeAllInputs();
	});

	function handleUrlHash() {
		parsedHash = $page.url.hash.split('&');
		parsedHash.forEach((hash) => {
			let [key, value] = hash.split('=');
			key = key.replace('#', '');
			let obj = { key, value };
			// console.log(`🚀 ~ file: index.svelte ~ line 10 ~ load ~ key`, key);
			// console.log(`🚀 ~ file: index.svelte ~ line 11 ~ load ~ value`, value);
			// console.log(`🚀 ~ file: index.svelte ~ line 41 ~ parsedHash.forEach ~ obj`, obj);
			key && value ? (urlHashObject[key] = value) : null;
		});
		// console.log(
		// 	`🚀 ~ file: index.svelte ~ line 44 ~ parsedHash.forEach ~ urlHashObject`,
		// 	urlHashObject
		// );
		if (urlHashObject.hasOwnProperty('type')) {
			// urlHashObject['type'] === 'recovery')
			console.log(
				`🚀 ~ file: index.svelte ~ line 48 ~ onMount ~ urlHashObject['type'] === 'recovery')`,
				urlHashObject['type'] === 'recovery'
			);
			let access_token = urlHashObject['access_token']
            console.log(`🚀 ~ file: index.svelte ~ line 71 ~ handleUrlHash ~ token`, access_token)
			tokenStore.set(access_token);
			goto('/password_reset');
		}
	}

	function handleOperationSelect(msg) {
		console.log(`🚀 ~ file: index.svelte ~ line 10 ~ handleOperationSelect ~ msg`, msg);
		msg.detail.symbol !== '=' ? selectedOperation.set(msg.detail) : false;
		recalculateProblems();
		resizeAllInputs();
	}
</script>

<div id="worksheet-layout" class="layout-main w-full h-full">
	<OperationsMenu on:operationSelect={(msg) => handleOperationSelect(msg)} />
	<MathSettings />
	<Worksheet />
</div>

<!-- hash: "#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjQ5MjkwNjY3LCJzdWIiOiIyYWU0MzhiYS1mMjgxLTQzMzAtOGUxMy1iZGU4ZDU2ZWY4YTEiLCJlbWFpbCI6ImhlbGxvQG1pa2VwZWltYW4uY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIn0.ewZXI642tNOy27cQOO8-Cv0yhJJ6qXkmHYIsb6czX0w&expires_in=3600&refresh_token=JGgiunFjcu3cZo1t9GWdfw&token_type=bearer&type=recovery" -->
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
