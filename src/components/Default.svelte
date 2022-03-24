<script>
import OperationsMenu from "./OperationsMenu.svelte";


</script>

<div id="default-layout" class="grid">
<OperationsMenu />

</div>

<style lang="scss">
#default-layout {
    grid-template-areas:
        "operations-menu operations-menu"
        "main settings";
}
</style>