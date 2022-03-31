<script>
	import Icon from '@iconify/svelte';
	import tooltip from '$utils/tooltip';
	import { format, compareAsc } from 'date-fns';
	import { get } from 'svelte/store';
	import { worksheet, worksheets, loadWorksheet, currentWorksheetID } from '$stores/math';
	import { page } from '$app/stores';
	import { onMount, afterUpdate } from 'svelte';

	// $: sheets = get(worksheets) || [];
	$: open = false;
	let sheets = [];
	worksheets.subscribe((cur) => {
		sheets = cur;
	});
	onMount(async () => {
		// console.log(`🚀 ~ file: SideNav.svelte ~ line 14 ~ page`, $page);
	});

	afterUpdate(() => {
		// console.log(`🚀 ~ file: SideNav.svelte ~ line 27 ~ afterUpdate ~ sheets`, sheets)
	});
	const icons = {
		// 'equalizer-1': 'ph:equalizer-bold',
		// 'equalizer-2': 'mdi:equalizer',
		// 'equalizer-3': 'icon-park-outline:equalizer',
		// 'list-view': 'dashicons:list-view',
		'grid-view': 'dashicons:grid-view',
		calculator: 'ant-design:calculator-filled',
		worksheets: 'ic:baseline-view-comfy',
		'arrow-left': 'bxs:arrow-to-left',
		'arrow-right': 'bxs:arrow-to-right'
	};

	function worksheetNavigate(cur) {
		console.log(`🚀 ~ file: SideNav.svelte ~ line 43 ~ worksheetNavigate ~ cur`, cur);
        loadWorksheet(cur);
	}

	function formatDate(date) {
		return format(new Date(date), 'MM/dd/yyyy');
	}

    function getNumProblems(cur) {
        let numProblems;
        let tof = typeof cur.problems;
        // console.log(`🚀 ~ file: SideNav.svelte ~ line 47 ~ getNumProblems ~ tof`, tof)
		tof === 'string'
			? (numProblems = JSON.parse(cur.problems).length)
			: (numProblems = cur.problems.length);
        return numProblems;
    }

	function tooltipData(cur) {
		// console.log(`🚀 ~ file: SideNav.svelte ~ line 53 ~ tooltipData ~ cur`, cur)
		let date, numProblems
        numProblems = getNumProblems(cur);
		// console.log(`🚀 ~ file: SideNav.svelte ~ line 56 ~ tooltipData ~ tof`, tof)
		cur.created_at ? (date = formatDate(cur.created_at)) : (date = 'N/A');

		return `${date} ${numProblems} problems`;
	}

	function collapseMenu() {
		console.log(`🚀 ~ file: SideNav.svelte ~ line 55 ~ collapseMenu ~ collapseMenu`);
	}
</script>

<div id="sidenav" class="flex flex-col w-full items-center justify-start bg-winterblues-900">
	<div class="flex items-center justify-end cursor-pointer group w-full" on:click={collapseMenu}>
		<!-- <hr class="w-full border-b-2 border-winterblues-500 mx-2"> -->
		<Icon
			icon={icons['arrow-left']}
			class="w-8 h-8 self-end mr-2 group-hover:text-sky-500 transition-all"
		/>
	</div>
	<h3 class="">Saved Worksheets</h3>
	<hr class="w-full border-b-2 border-winterblues-500 mx-2" />
	<div class="flex flex-col justify-between w-full">
		{#if sheets && sheets.length}
			{#each sheets as cur, i}
				<div
					class="tooltip flex items-center justify-between text-2xl my-2 border-b-2 border-transparent 
                    hover:bg-sky-900 hover:text-winterblues-400 hover:cursor-pointer transition-all duration-75 hover:border-b-2 hover:border-sky-500
                    {cur.xid === $currentWorksheetID ? 'text-amber-200 bg-winterblues-800' : ''}"
					use:tooltip
					title={tooltipData(cur)}
					on:click={() => {
						worksheetNavigate(cur);
					}}
				>
					<div class="ml-2">{i + 1}.</div>
					<div class="flex flex-col">
                        <div class="text-sm">{formatDate(cur.created_at)}</div>
                                            <div class="text-sm">{getNumProblems(cur)} problems</div>
                    </div>
					<div  class="mr-2 text-sm text-amber-300 bg-winterblues-800 w-6 h-6 rounded-3xl flex items-center justify-center" >
                        <Icon icon={cur.operation.iconname}/>
                    </div>
					<div  class="mr-2 text-sm text-amber-300 bg-winterblues-800 w-6 h-6 rounded-3xl flex items-center justify-center" >
                        <Icon icon={cur.operation.iconname}/>
                    </div>
				</div>
			{/each}
		{/if}
	</div>
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
