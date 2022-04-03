<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { user } from '$stores/auth.js';
	import { Switch } from '@rgossiaux/svelte-headlessui';

	let enabled = false;
	user.set(supabase.auth.user());
	$: console.log(`🚀 ~ file: Auth.svelte ~ line 6 ~ $: user`, $user);
	supabase.auth.onAuthStateChange((_, session) => {
		if (session?.user) {
			user.set(session?.user);
		}
	});
	import tooltip from '$utils/tooltip';
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
</script>

<div
	class="flex items-center justify-center bg-gradient-to-br from-lightBlue-400 via-winterblues-900 to-fuchsia-400 w-full h-full"
>
	<div class="flex items-center justify-center bg-black bg-opacity-50 w-[50%] h-[50%] rounded-xl">
		<div
			class="flex flex-col items-center justify-center bg-gradient-to-bl from-lightBlue-400 via-winterblues-900 to-fuchsia-40 bg-opacity-50 w-[50%] h-[50%] rounded-xl"
		>
			<h1 class="text-3xl font-vollkorn py-3 px-6 border-2 rounded border-lightBlue-300">
				Math App
			</h1>
			<div
				class="tooltip flex flex-col items-center justify-center p-2"
				use:tooltip
				title="Sign in via magic link with your email below."
			>
				<button
					class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-blue-700 hover:bg-blue-500 cursor-pointer"
				>
					Sign Up
				</button>

				<Switch
					checked={enabled}
					on:change={(e) => (enabled = e.detail)}
					class={enabled ? 
                    'switch switch-enabled ' 
                    : 'switch switch-disabled '}
				>
					<span class="sr-only">Enable notifications</span>
					<span class="toggle" class:toggle-on={enabled} class:toggle-off={!enabled} />
				</Switch>
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
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	:global(.switch) {
		position: relative;
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		height: 1.4rem;
		width: 2.75rem;
	}

	:global(.switch-enabled) {
		/* Blue */
		background-color: var(--color-limegreens-800);
	}
    
	:global(.switch-disabled) {
        /* Gray */
        background-color: var(--color-winterblues-100);
    }
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	.toggle {
		display: inline-block;
		width: 1.3rem;
		height: 1.3rem;
		box-shadow:none;
        background-color: var(--color-limegreens-800);
		border-radius: 9999px;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 350ms;
		// transition-property: transform background-color;
		transition-property: all;
	}

	.toggle-on {
		transform: translateX(1.35rem);
        background-color: var(--color-green-400);
	}
    
	.toggle-off {
        transform: translateX(.15rem);
        background-color: var(--color-winterblues-800);
	}

	.enabled {
		transform: translateX(1rem);
	}
</style>
