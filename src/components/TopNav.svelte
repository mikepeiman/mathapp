<script>
	import Icon from '@iconify/svelte';
	import tooltip from '$utils/tooltip';
	import { currentView, showModal } from '$stores/stores';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import { currentUser } from '$stores/auth.js';
	import { supabase } from '$lib/supabaseClient.js';
	import LoginModal from './LoginModal.svelte';
	import ModalContent from './ModalContent.svelte';
	import DialogComp from './Dialog.svelte';
	import Modal from 'svelte-simple-modal';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	import { fade } from 'svelte/transition';
	import UserAuth from './UserAuth.svelte';
	console.log(`🚀 ~ file: TopNav.svelte ~ line 7 ~ page`, $page.url);
	currentUser.set(supabase.auth.user());
	$: current = get(currentView);
	$: isOpen = false;
	const navicons = [
		{
			icon: 'ic:baseline-view-comfy',
			url: '/',
			name: 'Worksheets'
		},
		{ icon: 'ant-design:calculator-filled', url: '/calc', name: 'Calculator' }
	];

	const iconify = {
		user: 'bxs:user'
	};

	function navigate(icon) {
		console.log(`🚀 ~ file: TopNav.svelte ~ line 24 ~ navigate ~ icon`, icon);
		current = icon;
		currentView.set(icon);
	}

	function handleDialog() {
		isOpen = !isOpen;
		console.log(`🚀 ~ file: TopNav.svelte ~ line 30 ~ handleDialog ~ isOpen`, isOpen);
	}
</script>

<div id="header" class="grid w-full  items-center justify-center bg-blueGray-800 border-b-2 border-blueGray-600">
	<div class="logo">
		{#if isOpen}
			<div class="flex" transition:fade>
				<h1
					class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-fuchsia-700 hover:bg-fuchsia-500 cursor-pointer"
					on:mousedown={() => handleDialog()}
					on:mouseup={() => handleDialog()}
				>
					Dialog
				</h1>
				<Transition
					show={isOpen}
					enter="transition duration-500 ease-out"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-500 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0"
				>
					<DialogComp {isOpen} static />
				</Transition>
			</div>
		{/if}
	</div>
	<div class="nav flex items-center justify-center">
		{#each navicons as icon}
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
		<UserAuth inOrUp="in" />
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
