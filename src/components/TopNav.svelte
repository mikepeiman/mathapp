<script>
	import Icon from '@iconify/svelte';
	import tooltip from '$utils/tooltip';
	import { currentView } from '$stores/stores';
	import { get } from 'svelte/store';
    import { page } from '$app/stores'
import Auth from './Auth.svelte';
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

<div id="header" class="grid w-full  items-center justify-center bg-winterblues-900">
	<div class="logo"></div>
	<div class="nav flex items-center justify-center">
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
    <div class="auth flex h-full justify-end items-center">
        <Auth />
    </div>
</div>

<style lang="scss">
#header {
	display: grid;
	// grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	// grid-template-columns: repeat(auto-fit, 33%);
	grid-template-rows: auto;
	grid-template-columns: 33% 33% 33%;
	grid-template-areas: 'logo nav auth';
}

.auth {
	grid-area: auth;
}

.nav {
	grid-area: nav;
}

.logo {
	grid-area: logo;
}
</style>