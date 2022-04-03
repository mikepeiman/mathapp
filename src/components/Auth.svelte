<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { user } from '$stores/auth.js';
	user.set(supabase.auth.user());
	$: console.log(`🚀 ~ file: Auth.svelte ~ line 6 ~ $: user`, $user);
	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
		if (session?.user) {
			console.log(
				`🚀 ~ file: Auth.svelte ~ line 11 ~ supabase.auth.onAuthStateChange ~ user`,
				user
			);
		}
	});
	import tooltip from '$utils/tooltip';
	let loading = false;
	let email;
	// $: email = ''
	function handleLogin() {
		console.log(`🚀 ~ file: Auth.svelte ~ line 7 ~ handleLogin ~ handleLogin`);
		email;
		console.log(`🚀 ~ file: Auth.svelte ~ line 11 ~ handleLogin ~ email`, email);
	}

	async function signInWithEmail() {
		// console.log(`🚀 ~ file: Auth.svelte ~ line 18 ~ signInWithEmail ~ email`, email);
		// console.log(`🚀 ~ file: Auth.svelte ~ line 20 ~ signInWithEmail ~ supabase`, supabase);
		// console.log(
		// 	`🚀 ~ file: Auth.svelte ~ line 21 ~ signInWithEmail ~ supabase.auth`,
		// 	supabase.auth
		// );
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
	function logUser() {
		console.log(`🚀 ~ file: Auth.svelte ~ line 42 ~ logUser ~ user`, $user);
	}
</script>

{#if !$user}
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
					placeholder="magic link email sign-in"
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
{$user.email}
<button
	class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-fuchsia-700 hover:bg-fuchsia-500 cursor-pointer"
	on:click={signOut}
>
	Sign Out
</button>
{/if}
