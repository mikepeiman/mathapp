<script>
	import Icon from '@iconify/svelte';
    import tooltip from '$utils/tooltip';
	const icons = {
		'equalizer-1': 'ph:equalizer-bold',
		'equalizer-2': 'mdi:equalizer',
		'equalizer-3': 'icon-park-outline:equalizer',
		'list-view': 'dashicons:list-view'
	};
</script>

<div class="flex w-full items-center justify-center bg-winterblues-900">
	<div class="tooltip flex items-center justify-center text-4xl mx-2 hover:text-winterblues-400 transition-all"
    use:tooltip
    title="This doesn't do anything yet">
        <Icon icon={icons['equalizer-1']} />
    </div>
	<div class="tooltip flex items-center justify-center text-4xl mx-2 hover:text-winterblues-400 transition-all"
    use:tooltip
    title="This doesn't do anything either">
        <Icon icon={icons['list-view']} />
    </div>
</div>
