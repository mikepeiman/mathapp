<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { currentUser } from '$stores/auth.js';
	import { Switch } from '@rgossiaux/svelte-headlessui';
	import {
		Tab,
		TabGroup,
		TabList,
		TabPanel,
		TabPanels,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	let loggedIn = false;
	let option1 = false;
	$: currentUser.set(supabase.auth.user());
	$: $currentUser ? loggedIn = true : loggedIn = false;
	$: console.log(`🚀 ~ file: index.svelte ~ line 16 ~ currentUser`, $currentUser);
	supabase.auth.onAuthStateChange((_, session) => {
		if (session?.user) {
			currentUser.set(session?.user);
		}
	});
	import tooltip from '$utils/tooltip';
	import { onMount } from 'svelte';
import Checkbox from '$components/Checkbox.svelte';
	let loading = false;
	let email,
		password,
		passwordError = false;

	onMount(() => {});

	async function signInWithPassword() {
		try {
			loading = true;
			const { user, error } = await supabase.auth.signIn({
				email,
				password
			});
			console.log(`🚀 ~ file: index.svelte ~ line 38 ~ signInWithPassword ~ user`, user);
			if (error) throw error;
			// return user
		} catch (error) {
			console.error(error);
			console.error(error.status, typeof error.status);
			console.error(error.message);
			// alert(error.error_description || error.message);
			if (error.status >= 400 && error.status < 500) {
				console.log(`conditional in received 400-series error`);
				passwordError = true;
			}
		} finally {
			loading = false;
		}
	}
	async function signUpWithPassword() {
		try {
			loading = true;
			const { user, error } = await supabase.auth.signUp({
				email,
				password
			});
			console.log(`🚀 ~ file: index.svelte ~ line 62 ~ signUpWithPassword ~ user`, user);
			if (error) throw error;
		} catch (error) {
			console.error(error);
			console.error(error.status, typeof error.status);
			console.error(error.message);
			if (error.status >= 400 && error.status < 500) {
				console.log(`conditional in received 400-series error`);
				passwordError = true;
			}
		} finally {
			loading = false;
		}
	}
	async function signInWithEmail() {
		try {
			loading = true;
			const { user, error } = await supabase.auth.signIn({
				email
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
	async function resetPassword() {
		try {
			loading = true;
			const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
			console.log(
				`🚀 ~ file: index.svelte ~ line 98 ~ resetPassword ~ email ${typeof email}: `,
				email
			);
			console.log(`🚀 ~ file: index.svelte ~ line 102 ~ resetPassword ~ data`, data);
			if (error) throw error;
			// return user
		} catch (error) {
			console.error(error);
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	}
	async function updatePassword() {
		try {
			loading = true;
			const { user, error } = await supabase.auth.update({ password });
			console.log(`🚀 ~ file: index.svelte ~ line 111 ~ updatePassword ~ user`, user);
			if (error) throw error;
			// return user
		} catch (error) {
			console.error(error);
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	}

	function handleSubmit(msg, event) {
		console.log(`🚀 ~ file: Auth.svelte ~ line 21 ~ handleSubmit ~ msg ${msg}, event ${event}`);
		if (msg === 'magic') {
			signInWithEmail();
		} else if (msg === 'password') {
			event === 'signin' ? signInWithPassword() : false;
			event === 'signup' ? signUpWithPassword() : false;
			event === 'update' ? updatePassword() : false;
			event === 'reset' ? resetPassword() : false;
		} else if (msg === 'user') {
			event === 'signout' ? signOut() : false;
		}
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		error ? console.error(error) : (loggedIn = false);
        currentUser.set(supabase.auth.user())
	}
</script>

<div
	class="flex flex-col z-0 relative font-montserrat items-center justify-start bg-gradient-to-br from-winterblues-500 via-winterblues-900 to-fuchsia-400 w-full h-full"
>
<!-- <div class="bg-fuchsia-500 absolute top-0 left-0 w-full h-full bg-opacity-50 z-2"></div> -->
<!-- <div class="bg-white absolute top-0 left-0 w-full h-full bg-opacity-50 z-1"></div> -->
<!-- <div class="bg-black absolute top-0 left-0 w-full h-full bg-opacity-50 z-1"></div> -->
	<h1
		class="text-3xl w-full text-center absolute top-0 left-0 z-2 py-3 bg-black bg-opacity-80 lg:py-4 lg:rounded-t-lg border-lightBlue-300"
	>
		Math App
	</h1>
	<div
		class="flex flex-col absolute top-28 z-0 items-center justify-start bg-black bg-opacity-50  md:w-[70%] lg:w-[50%] lg:h-auto lg:rounded-b-lg "
	>
		<h1 class="text-2xl font-serif m-8">Sign up</h1>
		<!-- {$currentUser ? $currentUser.email : 'not signed in'}
		{#if $currentUser}
			<button
				class="p-2 bg-winterblues-700"
				type="submit"
				on:click={() => handleSubmit('user', 'signout')}>Sign out</button
			>
		{/if} -->
		<div class="tabs-wrapper flex w-full items-center justify-center">
			<div class="flex flex-col items-center justify-center p-2">
				<div class="flex flex-col">
					<form >
						<div class=" w-full mb-1 flex flex-col tooltip items-center justify-between">
							<label
								for="email"
								use:tooltip
								class="w-full border-2 border-fuchsia-500"
								title="Sign in via magic link with just your email address."
								><input
									type="text"
									name="email"
									bind:value={email}
									autocomplete="on"
									placeholder="Email address"
									class=" outline-none w-full bg-transparent border-transparent border-b-1 border-b-winterblues-700 p-2 focus:ring-0 focus:border-transparent focus:border-b-winterblues-500 active:outline-none active:border-none"
								/>
							</label>
							<ul>
								<li>	<label for="showAnswers" class="flex items-center"
									>Option One: 
									
									<Checkbox
										name="showAnswers"
										bind:checked={option1}
										class=" m-4 bg-winterblues-500 bg-opacity-50"
									/>{option1}
								</label></li>
								<li>	<label for="showAnswers" class="flex items-center"
									>Option One: 
									
									<Checkbox
										name="showAnswers"
										bind:checked={option1}
										class=" m-4 bg-winterblues-500 bg-opacity-50"
									/>{option1}
								</label></li>
							</ul>
							<button
								class="w-full p-2 bg-winterblues-700"
								type="submit"
								on:click|preventDefault={() => handleSubmit('magic')}>Continue</button
							>
						</div>
					</form>
				</div>
				<div
					class="flex flex-col items-center justify-center bg-gradient-to-l to-lightBlue-400 via-winterblues-800 bg-opacity-50 w-full h-4 my-10 rounded-xl"
				/>
				<div class="flex flex-col bg-gray-900 rounded-lg text-center">
					<p class="p-3 ">Change password, or create one for your account</p>
					<form>
						<div class="formset grid">
							<label
								for="password"
								use:tooltip
								title="Sign in with password if you created your acount that way."
								><input
									type="text"
									name="email"
									bind:value={email}
									autocomplete="on"
									placeholder="email address"
									class=" outline-none w-full bg-transparent border-transparent border-b-1 border-b-winterblues-700 p-2 focus:ring-0 focus:border-transparent focus:border-b-winterblues-500 active:outline-none active:border-none"
								/>
							</label>
							<button class="p-0 bg-greenge-700" type="submit" on:click|preventDefault={() => handleSubmit('password', 'reset')}
								>Reset Password</button
							>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.formset {
		grid-template-columns: 3fr 2fr;
		grid-gap: 1rem;
	}
	:global(.tabs-wrapping-div) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	:global(div[role='tablist']) {
		width: 100%;
	}
	.headless-tab {
		border-radius: 0px;
		color: black;
		cursor: pointer;
	}
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
		box-shadow: none;
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
		transform: translateX(0.15rem);
		background-color: var(--color-winterblues-800);
	}

	.enabled {
		transform: translateX(1rem);
	}

	/* Change Autocomplete styles in Chrome*/
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover,
	textarea:-webkit-autofill:focus,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus {
		border-bottom: 1px solid var(--color-winterblues-300);
		-webkit-text-fill-color: white;
		font-family: 'Montserrat', sans-serif;
		font-size: 1rem;
		-webkit-box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0.25) inset;
		transition: background-color 5000s ease-in-out 0s;
	}
</style>
