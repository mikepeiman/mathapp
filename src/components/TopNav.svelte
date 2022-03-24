<script>
	import Icon from '@iconify/svelte';
	const icons = {
		'equalizer-1': 'ph:equalizer-bold',
		'equalizer-2': 'mdi:equalizer',
		'equalizer-3': 'icon-park-outline:equalizer',
		'list-view': 'dashicons:list-view'
	};
</script>

<div class="flex w-full items-center justify-center bg-winterblues-900">
	<div class="flex items-center justify-center text-4xl mx-2 hover:text-winterblues-400 transition-all">
        <Icon icon={icons['equalizer-1']} />
    </div>
	<div class="flex items-center justify-center text-4xl mx-2 hover:text-winterblues-400 transition-all">
        <Icon icon={icons['list-view']} />
    </div>
</div>
