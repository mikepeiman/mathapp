<script context="module">
	import { getWorksheetsFromSupabase } from '$stores/math';
	export async function load() {
		// let res = await fetch('$api/worksheets.get.json');
		let data = await getWorksheetsFromSupabase();
		console.log(`🚀 ~ file: SideNav.svelte ~ line 4 ~ load ~ data`, data);
		return { stuff: { data }, params: { data }, props: { data } };
	}
</script>

<script>
	import Icon from '@iconify/svelte';
	import tooltip from '$utils/tooltip';
	// import { getWorksheetsFromSupabase } from '$stores/math';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { worksheets } from '$stores/math';
	$: sheets = $page.stuff.data || [];
	onMount(async () => {
		console.log(`🚀 ~ file: SideNav.svelte ~ line 14 ~ page`, $page);
		sheets = $page.stuff.data;
		// worksheets = await getWorksheetsFromSupabase();
		// console.log(`🚀 ~ file: SideNav.svelte ~ line 9 ~ onMount ~ worksheets`, worksheets)
	});
	const icons = {
		// 'equalizer-1': 'ph:equalizer-bold',
		// 'equalizer-2': 'mdi:equalizer',
		// 'equalizer-3': 'icon-park-outline:equalizer',
		// 'list-view': 'dashicons:list-view',
		'grid-view': 'dashicons:grid-view',
		calculator: 'ant-design:calculator-filled',
		worksheets: 'ic:baseline-view-comfy'
		// 'carousel': 'ic:outline-view-carousel',
		// 'calculator-2': 'ic:round-table-view',
		// 'calculator-3': 'bi:calculator-fill',
		// 'calculator-5': 'clarity:calculator-solid',
		// 'quiz': 'ic:baseline-quiz',
		// 'quiz-2': 'fluent:quiz-new-28-filled',
		// 'user-profile': 'bxs:user-circle'
	};

	function worksheetNavigate(cur) {
		console.log(`🚀 ~ file: SideNav.svelte ~ line 43 ~ worksheetNavigate ~ cur`, cur);
	}
</script>

<div id="sidenav" class="flex flex-col w-full items-center justify-start bg-winterblues-900">
	{#if sheets && sheets.length}
		{#each sheets as cur}
			<div
				class="tooltip flex items-center justify-center text-4xl my-2 hover:text-winterblues-400 hover:cursor-pointer transition-all"
				use:tooltip
				title={icons['grid-view']}
				on:click={() => {
					worksheetNavigate(cur);
				}}
			>
				<Icon icon={icons['grid-view']} />
			</div>
		{/each}
	{/if}
	<!-- {#each Object.keys(icons) as icon}
		<div
			class="tooltip flex items-center justify-center text-4xl my-2 hover:text-winterblues-400 hover:cursor-pointer transition-all"
			use:tooltip
			title={icons[icon]}
		>
			<Icon icon={icons[icon]} />
		</div>
	{/each} -->
</div>
