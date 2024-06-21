<script lang="ts">
    import { isSoundOnStore, toggleSound } from "../stores/SoundStore";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<i 
    class="fa-solid fa-lg fa-volume-{$isSoundOnStore ? "high" : "xmark"}" 
    on:click={toggleSound}
/>