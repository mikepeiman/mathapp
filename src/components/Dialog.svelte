<script>
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	export let isOpen = true;
	$: console.log(`🚀 ~ file: Dialog.svelte ~ line 10 ~ isOpen`, isOpen);
</script>

<Transition
	show={isOpen}
	enter="transition duration-500 ease-out"
	enterFrom="transform scale-95 opacity-0"
	enterTo="transform scale-100 opacity-100"
	leave="transition duration-500 ease-out"
	leaveFrom="transform scale-100 opacity-100"
	leaveTo="transform scale-95 opacity-0"
>
	<Dialog on:close={() => (isOpen = false)}>
		<DialogOverlay class="p-3  w-full h-full fixed top-0 left-0 text-white" />
		<TransitionChild
			enter="ease-out duration-500"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-500"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div
				class="flex flex-col w-full h-full bg-black bg-opacity-100 fixed items-center justify-center top-0 left-0 p-20 lg:p-[15%] 2xl:p-[25%]"
			>
				<DialogTitle><h1 class="text-3xl font-bold text-sky-300 p-2">Welcome to the Math App!</h1></DialogTitle>
				
				<DialogDescription>Easy, quick, and free (for now)</DialogDescription>
				<p>The easiest way to generate math worksheets for your students and children.</p>
				<div class="flex mt-4">
					<button
						class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-sky-700 hover:bg-sky-500 cursor-pointer"
						on:click={() => (isOpen = false)}>Sign Up</button
					>
					<button
						class="text-lg xl:text-xl text-center p-2 mx-2 rounded bg-amber-700 hover:bg-amber-500 cursor-pointer"
						on:click={() => (isOpen = false)}>Cancel</button
					>
				</div>
			</div>
		</TransitionChild>

		<!-- ... -->
	</Dialog>
</Transition>
