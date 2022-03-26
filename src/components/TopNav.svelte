<script>
	import Icon from '@iconify/svelte';
	import tooltip from '$utils/tooltip';
	import { currentView } from '$stores/stores';
	import { get } from 'svelte/store';
	$: current = get(currentView);
	//  $: current
	//  $: console.log(`🚀 ~ file: TopNav.svelte ~ line 8 ~ current`, current)
	// const icons = {
	// 	// 'equalizer-1': 'ph:equalizer-bold',
	// 	// 'equalizer-2': 'mdi:equalizer',
	// 	// 'equalizer-3': 'icon-park-outline:equalizer',
	// 	// 'list-view': 'dashicons:list-view',
	// 	// 'grid-view': 'dashicons:grid-view',
	// 	'calculator': 'ant-design:calculator-filled',
	// 	'worksheets': 'ic:baseline-view-comfy',
	// 	// 'carousel': 'ic:outline-view-carousel',
	// 	// 'calculator-2': 'ic:round-table-view',
	// 	// 'calculator-3': 'bi:calculator-fill',
	// 	// 'calculator-5': 'clarity:calculator-solid',
	// 	// 'quiz': 'ic:baseline-quiz',
	// 	// 'quiz-2': 'fluent:quiz-new-28-filled',
	// 	// 'user-profile': 'bxs:user-circle'
	// };
	const icons = [
		{ icon: 'ant-design:calculator-filled', url: '/', name: 'Calculator' },
		{
			icon: 'ic:baseline-view-comfy',
			url: 'worksheets',
			name: 'Worksheets'
		}
	];

	function navigate(icon) {
		console.log(`🚀 ~ file: TopNav.svelte ~ line 24 ~ navigate ~ icon`, icon);
		current = icon;
		currentView.set(icon);
	}
</script>

<div id="header" class="flex w-full items-center justify-center bg-winterblues-900">
	{#each icons as icon}
		<a
			class="tooltip flex items-center justify-center text-4xl mx-2 hover:text-winterblues-400 hover:cursor-pointer transition-all
            {current.name === icon.name ? 'text-winterblues-600' : ''}
            {icon.name == 'Worksheets' ? 'rotate-90' : ''}"
			on:click={() => navigate(icon.url)}
			href={icon.url}
			use:tooltip
			title={icon.name}
		>
			<Icon icon={icon.icon} />
		</a>
	{/each}
</div>
