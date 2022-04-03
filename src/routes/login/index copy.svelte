<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { user } from '$stores/auth.js';
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
	let enabled = false;
	user.set(supabase.auth.user());
	$: console.log(`🚀 ~ file: Auth.svelte ~ line 6 ~ $: user`, $user);
	supabase.auth.onAuthStateChange((_, session) => {
		if (session?.user) {
			user.set(session?.user);
		}
	});
	import tooltip from '$utils/tooltip';
	import { onMount } from 'svelte';
	let loading = false;
	let email;

	onMount(() => {
		let tabsGroup = document.querySelector('.tabs-wrapper');
		console.log(`🚀 ~ file: index.svelte ~ line 29 ~ onMount ~ tabsGroup`, tabsGroup);
        let tabsGroupChildren = tabsGroup.children;
        console.log(`🚀 ~ file: index.svelte ~ line 31 ~ onMount ~ tabsGroupChildren`, tabsGroupChildren)
        let tabsWrappingDiv = tabsGroupChildren[0];
        console.log(`🚀 ~ file: index.svelte ~ line 33 ~ onMount ~ tabsWrappingDiv`, tabsWrappingDiv)
        let tabList = tabsWrappingDiv.children[0];
        console.log(`🚀 ~ file: index.svelte ~ line 35 ~ onMount ~  tabList`,  tabList)
        tabsWrappingDiv.classList.add('tabs-wrapping-div');
        tabsWrappingDiv.classList.add('flex');
        tabsWrappingDiv.setAttribute('class', 'tabs-wrapping-div');
        tabsWrappingDiv.style.width = '100%';
        tabsWrappingDiv.style = 'width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;';
        tabList.style = 'width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-around;';
        let tabListChildren = tabList.children;
        console.log(`🚀 ~ file: index.svelte ~ line 48 ~ onMount ~ tabListChildren`, tabListChildren)
        let tabListButtons = Array.from(tabListChildren).filter(child => child.tagName === 'BUTTON');
        console.log(`🚀 ~ file: index.svelte ~ line 51 ~ onMount ~ tabListButtons`, tabListButtons)
        tabListButtons.forEach(button => {
            button.style = 'width: 50%; height: 100%; border-radius: 0;';
        });
	});

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
	class="flex flex-col font-montserrat items-center justify-center bg-gradient-to-br from-winterblues-500 via-winterblues-900 to-fuchsia-400 w-full h-full"
>
	<h1
		class="text-3xl w-[50%] text-center  py-3 bg-black bg-opacity-80 px-6  rounded-t-lg border-lightBlue-300"
	>
		Math App
	</h1>
	<div
		class="flex flex-col items-center justify-start bg-black bg-opacity-50 w-[50%] h-[50%] rounded-b-lg "
	>
		<ul class="features-list p-6 bg-winterblues-600 bg-opacity-60 mb-10">
			<li class="feature text-left px-2 py-1">
				The easiest way to create printable math worksheets for your students or children.
			</li>
			<li class="feature text-left px-2 py-1">
				An app to help understand and solve math problems.
			</li>
			<li class="feature text-left px-2 py-1">
				A curriculum and teaching aid with timed tests and scoring.
			</li>
		</ul>
		<div class="tabs-wrapper flex w-full items-center justify-between">
			<TabGroup>
				<TabList>
					<Tab><div class="headless-tab p-2 bg-winterblues-300">Sign Up</div></Tab>
					<Tab><div class="headless-tab p-2 bg-winterblues-400">Sign In</div></Tab>
				</TabList>
				<TabPanels>
					<TabPanel>Content 1</TabPanel>
					<TabPanel>
						<TabGroup>
							<TabList>
								<Tab><div class="headless-tab p-2">Email Link</div></Tab>
								<Tab><div class="headless-tab">With Password</div></Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<div
										class="tooltip flex flex-col items-center justify-center p-2"
										use:tooltip
										title="Sign in via magic link with your email below."
									>
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
									</div></TabPanel
								>
								<TabPanel>Content 2</TabPanel>
							</TabPanels>
						</TabGroup></TabPanel
					>
				</TabPanels>
			</TabGroup>
		</div>

		<!-- <div
			class="flex flex-col items-center justify-center bg-gradient-to-bl from-lightBlue-400 via-winterblues-900 to-fuchsia-40 bg-opacity-50 w-[50%] h-[50%] rounded-xl"
		/> -->
	</div>
</div>

<!-- <Switch
    checked={enabled}
    on:change={(e) => (enabled = e.detail)}
    class={enabled ? 
    'switch switch-enabled ' 
    : 'switch switch-disabled '}
>
    <span class="sr-only">Enable notifications</span>
    <span class="toggle" class:toggle-on={enabled} class:toggle-off={!enabled} />
</Switch> -->
<style lang="scss">
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
</style>
