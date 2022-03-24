<script>
	import Icon from '@iconify/svelte';
    import tooltip from '$utils/tooltip';
	const icons = {
		'equalizer-1': 'ph:equalizer-bold',
		'equalizer-2': 'mdi:equalizer',
		'equalizer-3': 'icon-park-outline:equalizer',
		'list-view': 'dashicons:list-view',
        'grid-view': 'dashicons:grid-view',
        'grid-view-2': 'ic:baseline-view-comfy',
        'carousel': 'ic:outline-view-carousel',
        'calculator': 'ic:outline-calculator',
        'calculator-2': 'ic:round-table-view',
        'calculator-3': 'bi:calculator-fill',
        'calculator-4': 'ant-design:calculator-filled',
        'calculator-5': 'clarity:calculator-solid',
        'quiz': 'ic:baseline-quiz',
        'quiz-2': 'fluent:quiz-new-28-filled',
        'user-profile': 'bxs:user-circle',
	};
</script>

<div class="flex w-full items-center justify-center bg-winterblues-900">
    {#each Object.keys(icons) as icon}
	<div class="tooltip flex items-center justify-center text-4xl mx-2 hover:text-winterblues-400 transition-all"
    use:tooltip
    title="{icons[icon]}">
        <Icon icon={icons[icon] }/>
    </div>
    {/each}
</div>
