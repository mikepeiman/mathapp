<script>
	import Icon from '@iconify/svelte';
	import tooltip from '$utils/tooltip';
	import { currentView } from '$stores/stores';
    import { get } from 'svelte/store';
 $: current = get(currentView)
//  $: current
//  $: console.log(`🚀 ~ file: TopNav.svelte ~ line 8 ~ current`, current)
	const icons = {
		'equalizer-1': 'ph:equalizer-bold',
		'equalizer-2': 'mdi:equalizer',
		'equalizer-3': 'icon-park-outline:equalizer',
		'list-view': 'dashicons:list-view',
		'grid-view': 'dashicons:grid-view',
		'worksheets': 'ic:baseline-view-comfy',
		'carousel': 'ic:outline-view-carousel',
		'calculator-2': 'ic:round-table-view',
		'calculator-3': 'bi:calculator-fill',
		'calculator-4': 'ant-design:calculator-filled',
		'calculator-5': 'clarity:calculator-solid',
		'quiz': 'ic:baseline-quiz',
		'quiz-2': 'fluent:quiz-new-28-filled',
		'user-profile': 'bxs:user-circle'
	};

	function navigate(icon) {
		console.log(`🚀 ~ file: TopNav.svelte ~ line 24 ~ navigate ~ icon`, icon);
        current = icon
		currentView.set(icon);
	}
</script>

<div id="header" class="flex w-full items-center justify-center bg-winterblues-900">
    {current}
    {#each Object.keys(icons) as icon}
		<a
			class="tooltip flex items-center justify-center text-4xl mx-2 hover:text-winterblues-400 hover:cursor-pointer transition-all
            {current === icon ? 'text-winterblues-600' : ''}
            {icon == "worksheets" ? 'rotate-90' : ''}"
			on:click={() => navigate(icon)}
            href={icon}
			use:tooltip
			title={icons[icon]}
		>
			<Icon icon={icons[icon]} />
</a>
	{/each}
</div>
