<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let icon;

    const onClick = () => {
        dispatch("click");
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<i class="{icon} fa-lg" on:click={onClick}></i>