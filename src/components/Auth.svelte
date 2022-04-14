<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { currentUser } from '$stores/auth.js';
	import { modal } from '$lib/modal.js';
	console.log(`🚀 ~ file: Auth.svelte ~ line 5 ~ modal`, modal);
	currentUser.set(supabase.auth.user());
	$: console.log(`🚀 ~ file: Auth.svelte ~ line 5 ~ currentUser`, currentUser);
	supabase.auth.onAuthStateChange((_, session) => {
		if (session?.user) {
			currentUser.set(session?.user);
			console.log(
				`🚀 ~ file: Auth.svelte ~ line 11 ~ supabase.auth.onAuthStateChange ~ user`,
				user
			);
		}
	});
	import tooltip from '$utils/tooltip';
	import { onMount } from 'svelte';
	let loading = false;
	let email;

	async function signInWithEmail() {
		try {
			loading = true;
			const { user, error } = await supabase.auth.signIn({
				email: `${email}`
			});
			console.log(`🚀 ~ file: Auth.svelte ~ line 21 ~ signInWithEmail ~ user`, user);
			if (error) throw error;
			// return user
			alert(`Welcome! Check your email for a verification link.`);
		} catch (error) {
			console.error(error);
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		error ? console.error(error) : console.log('signed out');
	}

	onMount(() => {
		let mod = modal.init();
		console.log(`🚀 ~ file: Auth.svelte ~ line 47 ~ onMount ~ mod`, mod);
	});

	
</script>

{#if !$currentUser}
	<div
		class="tooltip flex items-center justify-center p-2"
		use:tooltip
		title="Sign in via magic link with your email below."
	>
		<button
			class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-blue-700 hover:bg-blue-500 cursor-pointer"
		>
			Sign Up
		</button>

		<form on:submit|preventDefault={signInWithEmail}>
			<div>
				<label for="email"
					><input
						type="text"
						name="email"
						bind:value={email}
						autocomplete="on"
						placeholder="magic link email sign-in"
						class="text-sky-900"
					/>
				</label>
			</div>
		</form>
		<button
			class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-fuchsia-700 hover:bg-fuchsia-500 cursor-pointer"
			on:click={signInWithEmail}
		>
			Log In
		</button>
		<button
			class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-fuchsia-700 hover:bg-fuchsia-500 cursor-pointer"
			on:click={() => modal.open('openModal')}
		>
			Modal
		</button>
	</div>

	<div id="openModal" class="modal-hidden" >
		<div class="text-4xl text-cyan-400 bg-deepreds-200 p-24 z-99">Test content</div>
	</div>



{:else}
	{$currentUser.email}
	<button
		class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-fuchsia-700 hover:bg-fuchsia-500 cursor-pointer"
		on:click={signOut}
	>
		Sign Out
	</button>
{/if}

<style lang="scss">
	.modal {
		display: block;
		position: fixed;
		content: '';
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: -1;
		opacity: 0;
		transition: opacity 0.2s, z-index 0s 0.2s;
		text-align: center;
		white-space: nowrap;
		-webkit-overflow-scrolling: touch;
	}

	.modal > * {
		display: inline-block;
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

	.modal-visible .modal {
		z-index: 9999;
		opacity: 1;
		transition: opacity 0.2s;
	}

	.modal-inner {
		position: relative;
		overflow: hidden;
		max-width: 90%;
		max-height: 90%;
		background: #fff;
		z-index: -1;
		opacity: 0;
		transform: scale(0);
		transition: opacity 0.2s, transform 0.2s, z-index 0s 0.2s;
		min-width: 500px;
		border-radius: 6px;
	}
	.modal-visible .modal-inner {
		z-index: 100;
		opacity: 1;
		transform: scale(1);
		transition: opacity 0.2s, transform 0.2s;
	}

	#modal-content {
		padding: 50px 70px;
	}
</style>
