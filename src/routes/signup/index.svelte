<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { currentUser } from '$stores/auth.js';
	import tippy from 'tippy.js';
	import * as EmailValidator from 'email-validator';
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
	let mounted = false;
	let isValidEmail = true;
	let acceptedTerms,
		acceptedUpdates = false;
	$: mounted ? setTooltip(acceptedTerms) : null;
	$: currentUser.set(supabase.auth.user());
	$: $currentUser ? (loggedIn = true) : (loggedIn = false);
	$: console.log(`🚀 ~ file: index.svelte ~ line 16 ~ currentUser`, $currentUser);
	supabase.auth.onAuthStateChange((_, session) => {
		if (session?.user) {
			currentUser.set(session?.user);
		}
	});

	import tooltip from '$utils/tooltip';
	import { onMount } from 'svelte';
	import Checkbox from '$components/Checkbox.svelte';
	import Icon from '@iconify/svelte';
	import { getWorksheetsFromSupabase, worksheets } from '$stores/math';
	let loading = false;
	let email,
		password,
		passwordError = false;

	const icons = {
		google: 'flat-color-icons:google',
		twitter: 'logos:twitter',
		facebook: 'simple-icons:facebook',
		github: 'ant-design:github-filled',
		asterisk: 'el:asterisk'
	};

	onMount(() => {
		mounted = true;
	});

	// $: console.log(`🚀 ~ file: index.svelte ~ line 53 ~ isValidEmail`, isValidEmail);
	function checkIsValidEmail() {
		isValidEmail = EmailValidator.validate(email);
	}

	function handleSubmit(msg, provider) {
		if (!acceptedTerms) {
			return;
		}
		console.log(
			`🚀 ~ file: Auth.svelte ~ line 21 ~ handleSubmit ~ msg ${msg}, provider ${provider}`
		);
		if (msg === 'magic') {
			signInWithEmail();
		} else if (msg === 'email') {
			isValidEmail = EmailValidator.validate(email);
			console.log(`🚀 ~ file: Auth.svelte ~ line 28 ~ handleSubmit ~ email`, email);
			console.log(`🚀 ~ file: index.svelte ~ line 63 ~ handleSubmit ~ isValidEmail`, isValidEmail);
			if (!isValidEmail) {
			}
		} else if (msg === 'password') {
			event === 'signin' ? signInWithPassword() : false;
			event === 'signup' ? signUpWithPassword() : false;
			event === 'update' ? updatePassword() : false;
			event === 'reset' ? resetPassword() : false;
		} else if (msg === 'user') {
			event === 'signout' ? signOut() : false;
		} else if (msg === 'social') {
			signInWithSocial(provider);
		} else {
			console.log(`🚀 ~ file: Auth.svelte ~ line 35 ~ handleSubmit ~ msg ${msg}`);
		}
	}

	function setTooltip(e) {
		console.log(`🚀 ~ file: index.svelte ~ line 53 ~ setTooltip ~ e`, e);
		let btn = tippy(document.querySelector('#continue-signup'));
		btn.setProps({
			onShow(instance) {
				acceptedTerms
					? instance.setContent('Continue to select a password for your new account')
					: instance.setContent('You must accept the terms and conditions to continue');
			}
		});
	}

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

	async function signInWithSocial(provider) {
		try {
			loading = true;
			const { user, session, error } = await supabase.auth.signIn({
				provider: provider
			});
			console.log(`🚀 ~ file: index.svelte ~ line 138 ~ signInWithSocial ~ user`, user);
			currentUser.set(user);
			getWorksheetsFromSupabase();
			console.log(`🚀 ~ file: index.svelte ~ line 159 ~ signInWithSocial ~ session`, session);
			// if (error) throw error;
			// return user
		} catch (error) {
			console.error(error);
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		error ? console.error(error) : (loggedIn = false);
		currentUser.set({ email: 'logged out' });
		worksheets.set([]);
	}
</script>

<div
	class="flex flex-col z-0 relative font-montserrat items-center justify-start bg-gradient-to-br from-winterblues-500 via-winterblues-900 to-fuchsia-400 w-full h-full"
>
	<!-- <div class="bg-fuchsia-500 absolute top-0 left-0 w-full h-full bg-opacity-50 z-2"></div> -->
	<!-- <div class="bg-white absolute top-0 left-0 w-full h-full bg-opacity-50 z-1"></div> -->
	<div class="bg-black absolute top-0 left-0 w-full h-full bg-opacity-50 z-1" />
	<div
		class="text-3xl  w-full text-center absolute top-0 left-0 z-2 py-3 bg-gradient-to-r from-winterblues-700 via-winterblues-900 to-fuchsia-800 bg-opacity-40 lg:py-4 lg:rounded-t-lg border-b-[1px] border-lightBlue-300"
	>
		<a href="/">Math App</a>
		<h2 class="text-lg text-gray-400">Curriculum For Life</h2>
	</div>
	<div
		class="flex flex-col absolute top-28 z-0 items-center justify-start  bg-opacity-50 w-[22rem] rounded-lg  "
	>
		<h1 class="text-3xl text-white font-serif mt-8 font-light">Sign up</h1>
		<!-- {$currentUser ? $currentUser.email : 'not signed in'}
		{#if $currentUser}
			<button
				class="p-2 bg-winterblues-700"
				type="submit"
				on:click={() => handleSubmit('user', 'signout')}>Sign out</button
			>
		{/if} -->
		<div class="flex flex-col w-full items-center justify-center">
			<div class="flex flex-col items-center justify-center p-2">
				<!-- <div class="flex flex-col"> -->
				<form>
					<div class=" w-auto mb-1 flex flex-col items-center justify-between">
						<label for="email" class="w-full border-[1px] m-4 mb-6 border-white"
							><input
								type="email"
								required
								name="email"
								bind:value={email}
								autocomplete="on"
								placeholder="Email address"
								on:blur={checkIsValidEmail}
								class=" outline-none w-full bg-transparent border-transparent border-b-1 border-b-winterblues-700 p-2 focus:ring-0 focus:border-transparent focus:border-b-winterblues-500 active:outline-none active:border-none"
							/>
							<div
								class="flex text-xs transition-all duration-500 relative
							{!isValidEmail ? 'h-8 p-2 bg-yellow-900 opacity-100 ' : 'bg-green-500 p-0 h-0 opacity-0 delay-1000'}"
							>
								{#if !isValidEmail}
									That doesn't seem like a valid email, please try again.
								{:else}
									<div class="absolute top-0 left-0 bg-green-500 h-8 p-2 w-full">That looks good, thanks!</div>
								{/if}
							</div>
						</label>
						<ul class="w-full">
							<li class="flex items-start justify-start">
								<Checkbox
									name="showAnswers"
									size="1.25rem"
									bind:checked={acceptedTerms}
									class="  rounded-none m-2 ml-0 mt-0"
								/>
								<label
									for="showAnswers"
									class=" items-center w-full text-sm text-left inline inline-block"
									>I agree to Math App & Curriculum For Life's
									<div class="flex">
										<a href="/terms-of-service" class="underline">Terms Of Service </a>
										<p class="mx-1">and</p>
										<a href="/privacy" class="underline"> Privacy Policy.</a><Icon
											icon={icons.asterisk}
											class="text-red-500 text-xs mx-1"
										/>
									</div>
								</label>
							</li>
							<li class="flex items-start justify-start mt-2 mb-1">
								<Checkbox
									name="showAnswers"
									size="1.25rem"
									bind:checked={acceptedUpdates}
									class="  rounded-none m-2 ml-0 mt-0"
								/>
								<label for="showAnswers" class=" items-center w-full text-sm text-left"
									>Curriculum For Life may use my email address to provide me with occasional
									updates on our apps. I can opt out at any time.
								</label>
							</li>
						</ul>
						<button
							id="continue-signup"
							class="w-full p-2 m-4  rounded-xl  transition-all duration-300
							{acceptedTerms
								? 'bg-winterblues-700 hover:bg-winterblues-500 hover:text-black'
								: 'bg-gray-500 cursor-default'}"
							type="submit"
							use:tooltip
							on:hover={(e) => console.log(e)}
							on:click|preventDefault={() => handleSubmit('email')}>Continue</button
						>
						<!-- data-tippy-content={acceptedTerms
							? 'Continue to select a password for your account.'
							: 'You must accept the terms of service and privacy policy to continue'} -->
						<!-- {#if acceptedTerms}
						<button
							class="w-full p-2 m-4  rounded-xl  transition-all duration-200
							{acceptedTerms ? 'bg-winterblues-700 hover:bg-winterblues-500 hover:text-black' : 'bg-gray-500 cursor-default'}"
							type="submit"
							use:tooltip
							data-tippy-content="Sign up with your email address."
							
							on:click|preventDefault={() => handleSubmit('magic')}>Continue</button
						>
						{:else}
						<button
							class="w-full p-2 m-4  rounded-xl  transition-all duration-200
							{acceptedTerms ? 'bg-winterblues-700 hover:bg-winterblues-500 hover:text-black' : 'bg-gray-500 cursor-default'}"
							type="submit"
							use:tooltip
							data-tippy-content="You must accept the terms of service and privacy policy to continue"
							
							on:click|preventDefault={() => handleSubmit('magic')}>Continue</button
						>
						{/if} -->
					</div>
				</form>
			</div>
			<div class="flex items-center justify-between w-auto">
				<div
					class="flex flex-col items-center justify-center bg-gradient-to-l from-lightBlue-400 to-winterblues-800 bg-opacity-50 w-36 h-[2px] my-4 rounded-xl"
				/>
				<div class="flex text-lightBlue-400">or</div>
				<div
					class="flex flex-col items-center justify-center bg-gradient-to-l to-lightBlue-400 from-winterblues-800 bg-opacity-50 w-36 h-[2px] my-4 rounded-xl"
				/>
			</div>
			<button
				class="w-full flex items-center justify-center p-2 m-2 text-winterblues-700 hover:bg-winterblues-800 hover:text-white hover:border-white border-[1px] border-winterblues-500 rounded-xl transition-all duration-100"
				type="submit"
				on:click|preventDefault={() => handleSubmit('social', 'google')}
			>
				<Icon icon={icons.google} class="w-6 h-6 mr-2" />
				<div class="flex">Sign in with Google</div></button
			>
			<button
				class="w-full flex items-center justify-center p-2 m-2 text-winterblues-700 hover:bg-winterblues-800 hover:text-white hover:border-white border-[1px] border-winterblues-500 rounded-xl transition-all duration-100"
				type="submit"
				on:click|preventDefault={() => handleSubmit('social', 'twitter')}
			>
				<Icon icon={icons.twitter} class="w-6 h-6 mr-2" />
				<div class="flex">Sign in with Twitter</div></button
			>
			<button
				class="w-full flex items-center justify-center p-2 m-2 text-winterblues-700 hover:bg-winterblues-800 hover:text-white hover:border-white border-[1px] border-winterblues-500 rounded-xl transition-all duration-100"
				type="submit"
				on:click|preventDefault={() => handleSubmit('social', 'facebook')}
			>
				<Icon icon={icons.facebook} class="w-6 h-6 mr-2" />
				<div class="flex">Sign in with Facebook</div></button
			>
			<button
				class="w-full flex items-center justify-center p-2 m-2 text-winterblues-700 hover:bg-winterblues-800 hover:text-white hover:border-white border-[1px] border-winterblues-500 rounded-xl transition-all duration-100"
				type="submit"
				on:click|preventDefault={() => handleSubmit('social', 'github')}
			>
				<Icon icon={icons.github} class="w-6 h-6 mr-2" />
				<div class="flex">Sign in with Github</div></button
			>
			<p class="text-sm m-4">Already have an account? <a href="/" class="underline">Sign in</a></p>
			<div class="mb-4" />
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
