<script>
	import Icon from '@iconify/svelte';
	import tooltip from '$utils/tooltip';
	import { currentView } from '$stores/stores';
	import { get } from 'svelte/store';
    import { page } from '$app/stores'
    console.log(`🚀 ~ file: TopNav.svelte ~ line 7 ~ page`, $page.url)
	$: current = get(currentView);

	const icons = [
        {
			icon: 'ic:baseline-view-comfy',
			url: '/',
			name: 'Worksheets'
		},
		{ icon: 'ant-design:calculator-filled', url: '/calc', name: 'Calculator' },

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
            {$page.url.pathname.toLowerCase() === `${icon.url.toLowerCase()}` ? 'text-winterblues-600' : ''}
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
