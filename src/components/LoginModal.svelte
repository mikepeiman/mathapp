<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { currentUser } from '$stores/auth.js';
	import modal from '$lib/modal.js';
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
	let email, password;

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
		modal.init();
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
			id="modal-trigger"
			class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-fuchsia-700 hover:bg-fuchsia-500 cursor-pointer"
			on:click={() => modal.open('openModal', 'modal-trigger')}
		>
			Modal
		</button>
	</div>

	<!-- MODAL -->
	<div id="openModal" class="modal-hidden md:w-[60vw] lg:w-[50vw] h-auto">

			<div
				class="flex flex-col items-center justify-center bg-black bg-opacity-50  lg:h-auto lg:rounded-b-lg "
			>
				{$currentUser ? $currentUser.email : 'not signed in'}
				{#if $currentUser}
					<button
						class="p-2 bg-winterblues-700"
						type="submit"
						on:click={() => handleSubmit('user', 'signout')}>Sign out</button
					>
				{:else}
					<h1
						class="text-3xl w-full md:w-[70%] lg:w-[50%] text-center  py-3 bg-black bg-opacity-80 lg:py-4 lg:rounded-t-lg border-lightBlue-300"
					>
						Log In
					</h1>
				{/if}

					<div class="flex flex-col items-center justify-center p-2">
						<div class="flex flex-col">
							<form>
								<div class="formset mb-1 grid tooltip items-center justify-between">
									<label
										for="email"
										use:tooltip
										title="Sign in via magic link with just your email address."
										><input
											type="text"
											name="email"
											bind:value={email}
											autocomplete="on"
											placeholder="email address"
											class=" outline-none w-full bg-transparent border-transparent border-b-1 border-b-winterblues-700 p-2 focus:ring-0 focus:border-transparent focus:border-b-winterblues-500 active:outline-none active:border-none"
										/>
									</label>
									<button
										class="w-full p-2 bg-winterblues-700"
										type="submit"
										on:click|preventDefault={() => handleSubmit('magic')}>Get magic link</button
									>
								</div>
							</form>
							<form>
								<div class="formset grid items-center justify-between">
									<label
										for="password"
										use:tooltip
										title="Sign in with password if you created your acount that way."
										><input
											type="text"
											name="password"
											bind:value={password}
											autocomplete="on"
											placeholder="password"
											class=" outline-none w-full bg-transparent border-transparent border-b-1 border-b-winterblues-700 p-2 focus:ring-0 focus:border-transparent active:outline-none active:border-none"
										/>
									</label>
									<button
										class="p-2 bg-winterblues-700"
										type="submit"
										on:click|preventDefault={() => handleSubmit('password', 'signin')}
										>Sign in with password</button
									>
								</div>
							</form>
							<form>
								<div class="formset grid items-center justify-between">
									<label
										for="password"
										use:tooltip
										title="Sign in with password if you created your acount that way."
										><input
											type="text"
											name="password"
											bind:value={password}
											autocomplete="on"
											placeholder="password"
											class=" outline-none w-full bg-transparent border-transparent border-b-1 border-b-winterblues-700 p-2 focus:ring-0 focus:border-transparent active:outline-none active:border-none"
										/>
									</label>
									<button
										class="p-2 bg-winterblues-700"
										type="submit"
										on:click|preventDefault={() => handleSubmit('password', 'signup')}
										>Sign up with password</button
									>
								</div>
							</form>
							<form>
								<div class="formset grid items-center justify-between">
									<label
										for="password"
										use:tooltip
										title="Sign in with password if you created your acount that way."
										><input
											type="text"
											name="password"
											bind:value={password}
											autocomplete="on"
											placeholder="password"
											class=" outline-none w-full bg-transparent border-transparent border-b-1 border-b-winterblues-700 p-2 focus:ring-0 focus:border-transparent active:outline-none active:border-none"
										/>
									</label>
									<button
										class="p-2 bg-winterblues-700"
										type="submit"
										on:click={() => handleSubmit('password', 'update')}>Update password</button
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
									<button
										class="p-0 bg-greenge-700"
										type="submit"
										on:click|preventDefault={() => handleSubmit('password', 'reset')}
										>Reset Password</button
									>
								</div>
							</form>
						</div>

				</div>
			</div>
		</div>

	<!-- //MODAL -->
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
