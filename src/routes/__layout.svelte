<script>
	import '../app.scss';
	import Footer from '$components/Footer.svelte';
	import { onMount } from 'svelte';
	import TopNav from '$components/TopNav.svelte';
	import LeftMenu from '$components/LeftMenu.svelte';
	import { supabase } from '$lib/supabaseClient.js';
	import { currentUser } from '$stores/auth.js';
	import { page } from '$app/stores';
	$: mounted = false;
	$: url = $page.url.pathname;
	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<div
		id="app-layout"
		class="grid w-full min-h-screen  bg-gray-900 absolute top-0 left-0 transition"
	>
		{#if url !== '/login' && url !== '/password_reset'}
			<TopNav />
			<div class="layout-main flex flex-col items-center jutify-center">
				<slot />
			</div>
			<Footer />
		{:else}
			<div class=" flex flex-col items-center jutify-center w-screen h-screen">
				<slot />
			</div>
		{/if}
	</div>
	<!-- {:else if mounted && !$currentUser}
	Not logged in -->
{/if}

<style global lang="scss">
	#svelte {
		min-height: 100vh;
		// height: 100%;
		// background: var(--color-deepreds-600);
		// height: calc(100% - 80px);
	}
	#app-layout {
		// height: calc(100vh - 160px);
		// height: 100%;
		// width: 100%;
		// width: 100vw;
		grid-template-rows: 80px auto 80px;
		grid-template-columns: auto;
		grid-template-areas:
			' header'
			'  layout-main '
			' footer';
	}

	#header {
		grid-area: header;
	}

	#leftmenu {
		grid-area: leftmenu;
	}

	#footer {
		grid-area: footer;
	}

	#default-layout,
	.layout-main {
		grid-area: layout-main;
		// max-width: 100vw;
		// height: calc(100% - 80px);
	}
	// :root {
	// 	background-color: red;
	// 	height: 100vh;
	// }
	html {
		max-width: 100vw;
		width: 100%;
		// height: 100%;
		// background-color: pink;
	}

	body {
		// min-height: 100vh;
		margin: 0;
		// background-color: darkturquoise;
		height: 90%;
	}
	.tippy-box {
		background-color: var(--color-winterblues-500);
	}
	.tooltip.tooltip-open:after {
		display: none;
		opacity: 0;
	}
	.tippy-backdrop {
		background-color: rgba(0, 0, 0, 0);
		opacity: 0;
		z-index: -1;
		&:after {
			opacity: 0;
		}
		&:before {
			opacity: 0;
		}
	}
	// .tippy-box > .tippy-arrow:before {
	// 	border-top-color: var(--color-winterblues-500);
	// }
	.tippy-arrow {
		color: var(--color-winterblues-500);
	}

	.tooltip.tooltip-open:after,
	.tooltip.tooltip-open:before,
	.tooltip:hover:after,
	.tooltip:hover:before {
		opacity: 0;
		transition-delay: 0;
	}
</style>
