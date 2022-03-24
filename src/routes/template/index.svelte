<script>
import BasicCalculationForm from "$components/BasicCalculationForm.svelte";
import DigitsSettings from "$components/DigitsSettings.svelte";
import OperationsMenu from "$components/OperationsMenu.svelte";
import {selectedOperation } from '$stores/math'
import { processCalculation } from '$utils/math_operations'
import { onMount } from "svelte";

onMount(() => {
    processCalculation();
})

function handleOperationSelect(msg) {
        console.log(`🚀 ~ file: index.svelte ~ line 10 ~ handleOperationSelect ~ msg`, msg.detail)
		msg.detail.symbol !== '=' ? (selectedOperation.set(msg.detail)) : false;
		processCalculation();
	}
</script>

<OperationsMenu on:operationSelect={handleOperationSelect}  />
<DigitsSettings />
<BasicCalculationForm />