<script>
	import { newProblemWithRandomValues } from '$utils/math_operations.js';
	import { digitsA, digitsB } from '$stores/math.js';
    import { page } from '$app/stores'
    let path = $page.url.pathname
</script>

<div
	id="settings"
	class="flex flex-col items-center justify-start pt-10 bg-winterblues-500 bg-opacity-20"
>
	<div class="grid digits-grid gap-2 align-baseline w-full p-6">
		<div class="relative flex">
			<label for="digitsA" class="absolute bottom-0 p-2 inline-flex">Digits for first input</label>
		</div>
		<input
			type="number"
			name="digitsA"
			bind:value={$digitsA}
			class="basic-underline-number-input text-lg inline-block"
		/>
		<div class="relative flex">
			<label for="digitsA" class="p-2 absolute bottom-0">Digits for second input</label>
		</div>
		<input
			type="number"
			name="digitsB"
			bind:value={$digitsB}
			class="basic-underline-number-input"
		/>
	</div>
    {#if path === '/'}
	<button on:click={newProblemWithRandomValues} class="p-4 m-4 bg-winterblues-500 bg-opacity-50"
		>Generate random values</button
	>
    {/if}
</div>

<style lang="scss">
	.digits-grid {
		grid-template-columns: 1fr 2rem;
	}
	input[type='text'] {
		outline: 2px;
		width: 8ch;
		font-size: 2.5rem;
		:focus {
			outline: none;
			border: none;
		}
		:active {
			background-color: none;
			background: none;
		}
		::selection {
			background-color: red;
			background: none;
		}
	}
	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
		margin: 0;
	}
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
