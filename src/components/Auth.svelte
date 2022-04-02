<script>
	import { supabase } from '$lib/supabaseClient.js';
	import tooltip from '$utils/tooltip';
	let loading = false;
	let email;

	function handleLogin() {
		console.log(`🚀 ~ file: Auth.svelte ~ line 7 ~ handleLogin ~ handleLogin`);
	}
</script>

<div class="tooltip flex items-center justify-center p-2" on:click={handleLogin} use:tooltip title="Sign in via magic link with your email below.">
	<h1 class="text-lg md:text-xl text-center p-2 mx-2 rounded bg-blue-700 hover:bg-blue-500 cursor-pointer">Sign Up</h1>
	<h1 class="text-lg md:text-xl text-center p-2 mx-2 rounded bg-fuchsia-700 hover:bg-fuchsia-500 cursor-pointer">Log In</h1>
	<!-- <p class="text-center mt-2">Sign in via magic link with your email below.</p> -->
</div>
