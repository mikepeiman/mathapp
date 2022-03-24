<script>
    import Icon from "@iconify/svelte";
    export let  processCalculation
    import { digitsA, digitsB, result, selectedOperation, valueA, valueB} from '$stores/math'
    const icons = {
		times: 'fa-solid:times',
		minus: 'fa-solid:minus',
		plus: 'fa-solid:plus',
		divide: 'fa-solid:divide',
		equals: 'fa-solid:equals',
		'list-view': 'dashicons:list-view'
	};
    </script>

<div class="flex flex-col justify-center items-center text-4xl">
    <div class="flex">
        <input
            type="text"
            bind:value={$valueA}
            on:blur={processCalculation}
            class="basic-underline-text-input"
            placeholder="value A"
        />
        <div class="flex flex-col items-center justify-center text-lime-500 mx-2">
            <Icon icon={$selectedOperation.iconname || icons.times} class="text-3xl" />
        </div>
        <input
            type="text"
            bind:value={$valueB}
            on:blur={processCalculation}
            class="basic-underline-text-input"
            placeholder="value B"
        />
        <div on:click={processCalculation} class="flex items-center justify-center mx-2">
            <!-- <Icon icon={icons.equal} class="text-4xl text-lime-500" /> -->
            <Icon icon={icons.equals} class="text-3xl text-lime-500 " />
        </div>
        <input
            type="text"
            bind:value={$result}
            class="basic-underline-text-input"
            placeholder="value C"
        />
    </div>
</div>