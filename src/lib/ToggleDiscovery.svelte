<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let enabled = false;

    const toggle = () => {
        enabled = !enabled;

        dispatch("toggle", { enabled })
    }
</script>

<button class="discovery-toggle {enabled ? "enabled" : ""}" on:click={toggle}> 
    <i class="fa-solid fa-magic-wand-sparkles fa-xs"></i><p>Discoveries</p>
</button>

<style>
    .discovery-toggle {
        width: 100%;

        background-color: transparent;
        border: transparent;
        border-top: 1px solid #ccc;
        border-right: 1px solid #ccc;

        display: flex;
        justify-content: center;
        
        padding: 0.5rem;
    }

    .discovery-toggle p {
      font-size: 1em;
      font-weight: 650;

      margin: 1px;
    }

    .discovery-toggle i {
      margin-top: auto;
      margin-bottom: auto;
      margin-right: 0.3rem;

      scale: 1.1;
    }

    .enabled {
        background-color: rgb(201 239 239 / 25%); 
    }
</style>