<script>
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription,
        Transition
	} from '@rgossiaux/svelte-headlessui';
	let isOpen = true;
</script>

<Transition
	show={isOpen}
	enter="transition duration-100 ease-out"
	enterFrom="transform scale-95 opacity-0"
	enterTo="transform scale-100 opacity-100"
	leave="transition duration-75 ease-out"
	leaveFrom="transform scale-100 opacity-100"
	leaveTo="transform scale-95 opacity-0"
>
	<Dialog on:close={() => (isOpen = false)}>
		<DialogOverlay
			class="p-3 bg-gray-900 bg-opacity-30 w-full h-full fixed top-0 left-0 text-white"
		/>

		<div class="flex w-full h-full z-50">
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
