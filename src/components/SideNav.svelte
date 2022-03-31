<script>
	import Icon from '@iconify/svelte';
	import tooltip from '$utils/tooltip';
	import { format, compareAsc } from 'date-fns';
    import { get } from 'svelte/store';
	import { worksheets } from '$stores/math';
	import { page } from '$app/stores';
	import { onMount, afterUpdate } from 'svelte';

	// $: sheets = get(worksheets) || [];
    let sheets = []
    worksheets.subscribe(cur => {
        sheets = cur
    });
	onMount(async () => {
		console.log(`🚀 ~ file: SideNav.svelte ~ line 14 ~ page`, $page);

	});

    afterUpdate(() => {
        console.log(`🚀 ~ file: SideNav.svelte ~ line 27 ~ afterUpdate ~ sheets`, sheets)
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

	function formatDate(date) {
	 return	format(new Date(date), 'MM/dd/yyyy');
	}

    function tooltipData(cur) {
        // console.log(`🚀 ~ file: SideNav.svelte ~ line 53 ~ tooltipData ~ cur`, cur)
        let date, numProblems
        let tof = typeof cur.problems
        // console.log(`🚀 ~ file: SideNav.svelte ~ line 56 ~ tooltipData ~ tof`, tof)
        cur.created_at ? date = formatDate(cur.created_at) : date = 'N/A'
        tof === "string" ? numProblems = JSON.parse(cur.problems).length : numProblems = cur.problems.length
        return `${date} ${numProblems} problems`
    }
</script>

<div id="sidenav" class="flex flex-col w-full items-center justify-start bg-winterblues-900">
	{#if sheets && sheets.length}
		{#each sheets as cur, i}
			<div
				class="tooltip flex items-center justify-center text-4xl my-2  hover:text-winterblues-400 hover:cursor-pointer transition-all"
				use:tooltip
				title={tooltipData(cur)}
				on:click={() => {
					worksheetNavigate(cur);
				}}
			>{i}: id: {cur.id}
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
