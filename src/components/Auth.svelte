<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { currentUser } from '$stores/auth.js';
	currentUser.set(supabase.auth.user());
    $: console.log(`🚀 ~ file: Auth.svelte ~ line 5 ~ currentUser`, currentUser)
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
		const {error} = await supabase.auth.signOut();
		error ? console.error(error) : console.log('signed out');
	}
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
