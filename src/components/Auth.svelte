<script>
	import { supabase } from '$lib/supabaseClient.js';
	import tooltip from '$utils/tooltip';
	let loading = false;
	let email;

	function handleLogin() {
		console.log(`🚀 ~ file: Auth.svelte ~ line 7 ~ handleLogin ~ handleLogin`);
		email;
		console.log(`🚀 ~ file: Auth.svelte ~ line 11 ~ handleLogin ~ email`, email);
	}

	async function signInWithEmail() {
		try {
			loading = true
			const { user, error } = await supabase.auth.signIn({
				email: 'example@email.com',
				password: 'example-password'
			});
			if (error) throw error;
			alert(`Welcome ${user.email}! Check your email for a verification link.`);
		} catch (error) {
			console.error(error);
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut();
	}
</script>

<div
	class="tooltip flex items-center justify-center p-2"
	use:tooltip
	title="Sign in via magic link with your email below."
>
	<h1
		class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-blue-700 hover:bg-blue-500 cursor-pointer"
	>
		Sign Up
	</h1>
	<h1
		class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-fuchsia-700 hover:bg-fuchsia-500 cursor-pointer"
		on:click={handleLogin}
	>
		Log In
	</h1>
	<form on:submit|preventDefault={handleLogin}>
	<div>
		<label for="email"><input type="text" name="email" placeholder="email address"></label>
	</div>
	</form>
</div>
