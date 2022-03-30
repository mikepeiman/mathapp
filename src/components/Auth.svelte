<script>
	import { supabase } from '$lib/supabaseClient.js';
	let loading = false;
	let email;

	function handleLogin() {
		console.log(`🚀 ~ file: Auth.svelte ~ line 7 ~ handleLogin ~ handleLogin`);
	}
</script>

<div class="flex flex-col bg-gray-900 p-2" on:click={handleLogin}>
	<h1 class="text-2xl font-bold text-center text-winterblues-500 md:text-3xl">Login</h1>
	<p class="text-center mt-2">Sign in via magic link with your email below.</p>
</div>
