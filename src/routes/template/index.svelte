<script>
import BasicCalculationForm from "$components/BasicCalculationForm.svelte";
import DigitsSettings from "$components/DigitsSettings.svelte";
import OperationsMenu from "$components/OperationsMenu.svelte";

export let valueA, valueB, valueC
</script>

<OperationsMenu />
<DigitsSettings />
<BasicCalculationForm />