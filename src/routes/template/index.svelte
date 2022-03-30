<script>
import BasicCalculationForm from "$components/BasicCalculationForm.svelte";
import DigitsSettings from "$components/DigitsSettings.svelte";
import OperationsMenu from "$components/OperationsMenu.svelte";
import {selectedOperation } from '$stores/math'
import { processCalculation, newProblemWithRandomValues } from '$utils/math_operations'
import { onMount } from "svelte";

onMount(() => {
    newProblemWithRandomValues()
    // processCalculation();
})

function handleOperationSelect(msg) {
        console.log(`🚀 ~ file: index.svelte ~ line 10 ~ handleOperationSelect ~ msg`, msg.detail)
		msg.detail.symbol !== '=' ? (selectedOperation.set(msg.detail)) : false;
		processCalculation();
	}
</script>

<div id="default-layout" class="layout-main w-full h-full">
    <OperationsMenu on:operationSelect={handleOperationSelect}  />
    <DigitsSettings />
    <BasicCalculationForm />
</div>

<style lang="scss" global>
#default-layout {
    display: grid;
    grid-area: layout-main;
    grid-template-columns: 1fr 18rem;
    grid-template-rows: 20% 20% 1fr;
    grid-template-areas:
        "operations-menu settings"
        "basic-calculation-form settings"
        "empty settings";
}

#settings {
    grid-area: settings;
}

#basic-calculation-form {
    grid-area: basic-calculation-form;
}

#operations-menu {
    grid-area: operations-menu;
    margin-top: 2rem;
}
</style>