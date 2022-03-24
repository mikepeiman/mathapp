<script>
    export let digitsA, digitsB, newRandomValues
</script>

<div id="settings" class="flex flex-row my-10 items-center justify-center bg-winterblues-500 bg-opacity-0">
    <label for="digitsA" class="p-2">Digits for value A </label>
    <input
        type="number"
        name="digitsA"
        bind:value={digitsA}
        class="basic-underline-number-input text-lg"
    />
    <label for="digitsA" class="p-2">Digits for value B</label>
    <input
        type="number"
        name="digitsB"
        bind:value={digitsB}
        class="basic-underline-number-input"
    />
    <button on:click={newRandomValues} class="p-4 ml-4 bg-winterblues-500 bg-opacity-50"
        >Generate random values</button
    >
</div>

<style lang="scss">

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