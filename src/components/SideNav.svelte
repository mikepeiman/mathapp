<script>
	import Icon from '@iconify/svelte';
	import tooltip from '$utils/tooltip';
	import { format, compareAsc } from 'date-fns';
	import { get } from 'svelte/store';
	import {
		worksheet,
		worksheets,
		loadWorksheet,
		deleteWorksheet,
		currentWorksheetID,
		supabaseWorksheets,
		getAllLSWorksheets
	} from '$stores/math';
	import { page } from '$app/stores';
	import { onMount, afterUpdate } from 'svelte';

	// $: sheets = get(worksheets) || [];
	$: open = false;
	$: collapsed = false;
	$: sideMenuContent = false;
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
		'arrow-right': 'bxs:arrow-to-right',
		delete: 'fluent:delete-dismiss-24-filled',
		info: 'akar-icons:info-fill'
	};

	function worksheetNavigate(cur) {
		console.log(`🚀 ~ file: SideNav.svelte ~ line 43 ~ worksheetNavigate ~ cur`, cur);
		loadWorksheet(cur);
	}
	function del(cur) {
		console.log(`🚀 ~ file: SideNav.svelte ~ line 43 ~ worksheetNavigate ~ cur`, cur);
		deleteWorksheet(cur.id);
	}
	function info(cur) {
		console.log(`🚀 ~ file: SideNav.svelte ~ line 52 ~ info ~ cur`, cur.problems);
		let supaSheets = get(supabaseWorksheets);
		let lsSheets = getAllLSWorksheets();
		let supaSheet = supaSheets.find((sheet) => sheet.id === cur.id);
		let lsSheet = lsSheets.find((sheet) => sheet.id === cur.id);
		console.log(`🚀 ~ file: SideNav.svelte ~ line 59 ~ info ~ lsSheet`, lsSheet.problems);
		console.log(`🚀 ~ file: SideNav.svelte ~ line 54 ~ info ~ supaSheet`, supaSheet.problems);
	}

	function formatDate(date) {
		console.log(`🚀 ~ file: SideNav.svelte ~ line 64 ~ formatDate ~ date`, date);
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
		let date, numProblems;
		numProblems = getNumProblems(cur);
		// console.log(`🚀 ~ file: SideNav.svelte ~ line 56 ~ tooltipData ~ tof`, tof)
		cur.created_at ? (date = formatDate(cur.created_at)) : (date = 'N/A');

		return `${date} ${numProblems} problems`;
	}

	function collapseMenu() {
		console.log(`🚀 ~ file: SideNav.svelte ~ line 55 ~ collapseMenu ~ collapseMenu`);
		if (!sideMenuContent) {
			sideMenuContent = true;
		} else {
			setTimeout(() => {
				sideMenuContent = !sideMenuContent;
			}, 500);
		}

		collapsed = !collapsed;
		console.log(`🚀 ~ file: SideNav.svelte ~ line 92 ~ collapseMenu ~ collapsed`, collapsed);
		let collapseIcon = document.querySelector('.collapse-icon');
		collapseIcon.classList.toggle('collapsed');
	}
</script>

<div
	id="sidenav"
	class="flex flex-col relative w-full items-center justify-start bg-winterblues-900 transition-all duration-500
{collapsed ? 'w-12' : ''}"
>
	<div
		class="collapse-icon absolute top-0 flex items-center justify-end cursor-pointer group w-full transition-all"
		on:click={collapseMenu}
	>
		<!-- <hr class="w-full border-b-2 border-winterblues-500 mx-2"> -->
		<Icon
			icon={icons['arrow-left']}
			class="absolute w-8 h-8 self-end mr-2 top-0 group-hover:text-sky-500 transition-all duration-500
			{collapsed ? ' scale-x-[-1]' : ''}"
		/>
	</div>
	<div class="mt-12 top-12 opacity-100 transition-all duration-500">
		<div
			class="mt-12 top-12 opacity-100 transition-all duration-500
	{!collapsed ? 'opacity-100' : ''}"
		>
			{#if !sideMenuContent}
				<h3 class="">Saved Worksheets</h3>
				<hr class="w-full border-b-2 border-winterblues-500 mx-2" />
				<div class="flex flex-col justify-between w-full">
					{#if sheets && sheets.length}
						{#each sheets as cur, i}
							<div class="relative group">
								<div
									class="tooltip relative flex items-center justify-between text-2xl my-2 border-b-2 border-transparent 
												hover:bg-sky-900 hover:text-winterblues-400 hover:cursor-pointer transition-all duration-75 hover:border-b-2 hover:border-sky-500
												{cur.xid === $currentWorksheetID ? 'text-amber-200 bg-winterblues-700' : ''}"
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
									<div
										class="mr-2 text-sm text-amber-600 bg-winterblues-800 w-6 h-6 rounded-3xl flex items-center justify-center"
									>
										<Icon icon={cur.operation.iconname} />
									</div>
								</div>
								<div
									on:click={del(cur)}
									class="z-50 absolute -right-8 bg-deepreds-100 top-[10px] mr-2 text-xl text-amber-700  w-6 h-10 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-amber-300 flex items-center justify-center"
								>
									<Icon icon={icons.delete} />
								</div>
								<div
									on:click={info(cur)}
									class="z-50 absolute -right-14 hover:bg-winterblues-100 top-[10px] mr-2 text-xl hover:text-winterblues-700  w-6 h-10 opacity-0 group-hover:opacity-100 text-sky-600 bg-emerald-900 flex items-center justify-center"
								>
									<Icon icon={icons.info} />
								</div>
							</div>
						{/each}
					{/if}
				</div>
			{:else}
				<div
					class="opacity-0 transition-all duration-500
	{collapsed ? 'opacity-100' : ''}"
				>
					<Icon icon={icons.delete} class="my-2" />
					<Icon icon={icons.delete} class="my-2" />
					<Icon icon={icons.delete} class="my-2" />
					<Icon icon={icons.delete} class="my-2" />

				</div>
			{/if}
		</div>
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

<style lang="scss">
	.collapsed {
		transform: rotate(180deg);
		svg {
			transform: rotate(180deg);
		}
	}
</style>
