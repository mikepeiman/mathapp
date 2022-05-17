<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { currentUser } from '$stores/auth.js';
	import { worksheets } from '$stores/math.js';
	import Icon from '@iconify/svelte';
	currentUser.set(supabase.auth.user());
	supabase.auth.onAuthStateChange((_, session) => {
		if (session?.user) {
			currentUser.set(session?.user);
			console.log(
				`🚀 ~ file: Auth.svelte ~ line 11 ~ supabase.auth.onAuthStateChange ~ user`,
				$currentUser
			);
		}
	});
	import tooltip from '$utils/tooltip';
	import { onMount } from 'svelte';
	let loading = false;
	let email, password;

	const iconify = {
		user: 'bxs:user'
	};
	onMount(() => {

	});

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		error ? console.error(error) : console.log('signed out');
		currentUser.set(supabase.auth.user());
		// currentUser.set({email: "logged out"});
		worksheets.set([]);
	}
</script>

{#if !$currentUser}
<a
href="/signin"
class="flex group items-center justify-center text-lg xl:text-xl text-center p-2 mx-2 rounded bg-winterblues-700 hover:bg-winterblues-600 hover:text-white cursor-pointer transition-all duration-100"
>
<span>Log In</span>
<Icon icon={iconify.user} class="ml-1 mr-2 text-winterblues-100  transition-all" />
</a>
{:else}
	{$currentUser.email}
	<button
		class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-fuchsia-700 hover:bg-fuchsia-500 cursor-pointer"
		on:click={signOut}
	>
		Sign Out
	</button>
{/if}

<style lang="scss" global>
	#svelte {
		position: relative;
		z-index: 0;
	}
	.modal {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		// background: rgba(0, 0, 0, 0.6);
		background: linear-gradient(
			45deg,
			var(--color-winterblues-500) 0%,
			var(--color-winterblues-900) 50%,
			var(--color-fuchsia-500) 100%
		);
		opacity: 0.5;
		z-index: 101;
		opacity: 0;
		visibility: visible;
		transition: opacity 0.35s, z-index 0s 0.35s;
		text-align: center;
		white-space: nowrap;
		-webkit-overflow-scrolling: touch;
		transition: all 0.35s;
	}
	.vanilla-modal {
		// position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
	}
	.current-modal {
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 99;
	}

	.modal > * {
		// display: inline-block;
		white-space: normal;
		vertical-align: middle;
		text-align: left;
	}

	.modal:before {
		display: inline-block;
		overflow: hidden;
		width: 0;
		height: 100%;
		vertical-align: middle;
		content: '';
	}

	.modal-hidden {
		display: none;
	}

	.modal-visible.modal,
	.modal-visible .modal {
		z-index: 111;
		opacity: 1;
		transition: opacity 0.35s;
		transform: scale(1);
		transition: opacity 0.35s, transform 0.35s;
	}

	.modal-inner {
		position: relative;
		overflow: hidden;
		max-width: 90%;
		max-height: 90%;
		// background: #fff;
		z-index: -1;
		opacity: 1;
		transform: scale(0);
		transition: opacity 0.35s, transform 0.35s, z-index 0s 0.35s;
		min-width: 500px;
		border-radius: 6px;
	}
	.modal-visible .modal-inner {
		z-index: 99;
		opacity: 1;
		visibility: visible;
		transform: scale(1);
		transition: opacity 0.35s, transform 0.35s;
	}

	#modal-content {
		padding: 50px 70px;
		z-index: 99;
		cursor: pointer;
	}
</style>
