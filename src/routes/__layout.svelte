<script>
	import '../app.scss';
	import Footer from '$components/Footer.svelte';
	import { onMount } from 'svelte';
	import TopNav from '$components/TopNav.svelte';
	import SideNav from '$components/SideNav.svelte';
	let mounted = false;
	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<div
		id="app-layout"
		class="grid w-full min-h-screen  bg-black absolute top-0 left-0 z-90 transition"
	>
		<TopNav />
		<SideNav />
		<div class="layout-main  flex flex-col  items-center jutify-center bg-black/40">
			<slot />
		</div>
		<!-- <div class="relative z-20"> -->
		<Footer />
		<!-- </div> -->
	</div>
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
		grid-template-columns: 80px auto;
		grid-template-areas:
			'header header'
			'sidenav  layout-main '
			'footer footer';
	}

	#header {
		grid-area: header;
	}

	#sidenav {
		grid-area: sidenav;
	}

	#footer {
		grid-area: footer;
	}

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
