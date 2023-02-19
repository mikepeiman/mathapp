<script>
	import Icon from "@iconify/svelte";
	import tooltip from "$utils/tooltip";
	import { saveWorksheetSupabase, problemsPerPage, worksheet, LScheckForWorksheet, LSgetWorksheet, loadWorksheet } from "$stores/math";
	import { generateNewWorksheet, newProblemWithRandomValues } from '$utils/math_operations';
	import { setWorksheetValuesToDOM, resizeAllInputs } from '$utils/dom_operations.js';
	import { afterUpdate, onMount } from 'svelte';
	import MathSettings from "./MathSettings.svelte";
	$: collapsed = true;
	$: sideMenuContent = false;
	$: sheet = $worksheet || {};
	let loaded = false;
	$: saved = $worksheet.saved || false;
	const icons = {
		// 'equalizer-1': 'ph:equalizer-bold',
		// 'equalizer-2': 'mdi:equalizer',
		// 'equalizer-3': 'icon-park-outline:equalizer',
		// 'list-view': 'dashicons:list-view',
		"grid-view": "dashicons:grid-view",
		calculator: "ant-design:calculator-filled",
		worksheets: "ic:baseline-view-comfy",
		"arrow-left": "bxs:arrow-to-left",
		"arrow-right": "bxs:arrow-to-right",
		delete: "fluent:delete-dismiss-24-filled",
		info: "akar-icons:info-fill",
		sheets: "material-symbols:sheets-outline",
		addSheet: "material-symbols:sheets-add-on",
		settings: "ci:settings-filled",
		settings2: "akar-icons:settings-horizontal",
		reload: "ic:outline-settings-backup-restore",
		save: "bxs:save",
	};

	onMount(async () => {
		LScheckForWorksheet()
			? (sheet = await LSgetWorksheet())
			: (sheet = await generateNewWorksheet());
		loaded = true;
		saved = sheet.saved;
		console.log(`🚀 ~ file: RightMenu.svelte:37 ~ onMount ~ sheet`, sheet)
		console.log(`🚀 ~ file: RightMenu.svelte:37 ~ onMount ~ saved`, saved)
		loadWorksheet(sheet);
		await setWorksheetValuesToDOM(sheet);
	});
		console.log(`🚀 ~ file: RightMenu.svelte:41 ~ onMount ~ sheet`, sheet)

	function collapseMenu() {
		collapsed = !collapsed;
		setTimeout(() => {
			sideMenuContent = !sideMenuContent;
		}, 200);
	}
	function saveWorksheet() {
		console.log(`saveworksheet`);
		saveWorksheetSupabase();
	}

	function updateSheetProblems() {
		console.log(`🚀 ~ file: RightMenu.svelte:59 ~ updateSheetProblems ~ updateSheetProblems`,)
		if (sheet.problems?.length < $problemsPerPage) {
			let diff = $problemsPerPage - sheet.problems?.length;
			for (let i = 0; i < diff; i++) {
				let problem = newProblemWithRandomValues();
				console.log(
					`🚀 ~ file: Worksheet.svelte ~ line 51 ~ updateSheetProblems ~ problem`,
					problem
				);
				sheet.problems.push(newProblemWithRandomValues());
			}
		} else if (sheet.problems?.length > $problemsPerPage) {
			let diff = sheet.problems?.length - $problemsPerPage;
			for (let i = 0; i < diff; i++) {
				sheet.problems.pop();
			}
		}
		worksheet.set(sheet);
	}
</script>

<div
	id="right-menu"
	class="top-0 right-0 w-12 relative h-full bg-blueGray-800 opacity-100 transition-all duration-300 text-3xl flex flex-col items-end justify-start
{!collapsed ? 'w-48' : ''}">
	<div
		class="collapse-icon absolute top-0 right-0 flex items-end justify-end cursor-pointer bg-cyan-900  h-8 hover:bg-cyan-600 group w-full transition-all group"
		on:click={collapseMenu}>
		<!-- <hr class="w-full border-b-2 border-winterblues-500 mx-2"> -->
		<Icon
			icon={icons["arrow-left"]}
			class="absolute w-8 h-8 self-end  group-hover:text-sky-500 transition-all duration-500  group-hover:text-white
{!collapsed ? ' scale-x-[-1] w-full' : ''}" />
	</div>

	<div
		class="tooltip py-2 pr-2 relative mt-12 group flex items-center justify-end transition-all hover:bg-trueGray-900"
		use:tooltip
		title="Save worksheet"
		on:click={() => {
			saveWorksheet();
		}}>
		<label
			class="text-sm transition-all pr-2 group-hover:text-winterblues-300 w-[20ch] text-right 
         {collapsed ? 'hidden' : ''} 
         {sideMenuContent
				? 'opacity-100 visible scale-100'
				: 'opacity-0  scale-0'}">Save worksheet</label>
		<Icon
			icon={icons.save}
			class="group-hover:text-winterblues-500 transition-all" />
	</div>
	<div
		class="tooltip py-2 pr-2 relative group flex items-center justify-end transition-all hover:bg-trueGray-900"
		use:tooltip
		title="New worksheet">
		<label
			class="text-sm transition-all pr-2 group-hover:text-winterblues-300 w-[20ch] text-right
         {collapsed ? 'hidden' : ''} 
         {sideMenuContent
				? 'opacity-100 visible text-right'
				: 'opacity-0  scale-0'}">New worksheet</label>
		<Icon
			icon={icons.addSheet}
			class="group-hover:text-winterblues-500  transition-all" />
	</div>
	<div
		class="tooltip py-2 pr-2 relative group flex items-center justify-end transition-all hover:bg-trueGray-900"
		use:tooltip
		title="Display settings">
		<label
			class="text-sm transition-all pr-2 group-hover:text-winterblues-300 w-[20ch] text-right 
         {collapsed ? 'hidden' : ''} 
         {sideMenuContent ? 'opacity-100 visible' : 'opacity-0 scale-0'}"
			>Display settings</label>
		<Icon
			icon={icons.settings2}
			class="group-hover:text-winterblues-500 transition-all" />
	</div>
	<div
		class="tooltip py-2 pr-2 relative group flex items-center justify-end transition-all hover:bg-trueGray-900"
		use:tooltip
		on:click={() => updateSheetProblems()}
		title="New random values">
		<label
			class="text-sm transition-all pr-2 group-hover:text-winterblues-300 w-[20ch] text-right
         {collapsed ? 'hidden' : ''} 
         {sideMenuContent ? 'opacity-100 visible' : 'opacity-0  scale-0'}"
			>New random values</label>
		<Icon
			icon={icons.reload}
			class="group-hover:text-winterblues-500 transition-all" />
	</div>
	<div
		class="tooltip py-2 pr-2 relative group flex items-center justify-end transition-all hover:bg-trueGray-900"
		use:tooltip
		title="Math settings">
		<label
			class="text-sm transition-all pr-2 group-hover:text-winterblues-300 w-[20ch] text-right
         {collapsed ? 'hidden' : ''} 
         {sideMenuContent ? 'opacity-100 visible' : 'opacity-0  scale-0'}"
			>Math settings</label>
		<Icon
			icon={icons.settings}
			class="group-hover:text-winterblues-500 transition-all" />
	</div>
	<div
		class="relative group flex items-center justify-center w-full transition-all hover:bg-trueGray-900"
		title="Math settings">
		<label
			class="text-sm w-full transition-all p-0 group-hover:text-winterblues-300  text-right
         {collapsed ? 'hidden' : ''} 
         {sideMenuContent ? 'opacity-100 visible' : 'opacity-0  scale-0'}">
			<MathSettings /></label>
	</div>
</div>
