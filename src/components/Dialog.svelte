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
    $: console.log(`🚀 ~ file: Dialog.svelte ~ line 10 ~ isOpen`, isOpen)
     
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
        <TransitionChild
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
		<DialogOverlay
			class="p-3  w-full h-full fixed top-0 left-0 text-white"
		/>
        </TransitionChild>
		<div class="flex flex-col w-full h-full bg-black bg-opacity-75 fixed items-center justify-center top-0 left-0 p-20 lg:p-[15%] 2xl:p-[25%]">
			<DialogTitle>Deactivate account</DialogTitle>
			<DialogDescription>This will permanently deactivate your account</DialogDescription>
			<p>
				Are you sure you want to deactivate your account? All of your data will be permanently
				removed. This action cannot be undone.
			</p>
			<button on:click={() => (isOpen = false)}>Deactivate</button>
			<button on:click={() => (isOpen = false)}>Cancel</button>
		</div>

		<!-- ... -->
	</Dialog>
</Transition>
