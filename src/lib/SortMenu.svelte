<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { SortEnum } from "../enum/SortEnum";

    const dispatch = createEventDispatcher();

    let sortMode = SortEnum.TIME;

    const changeSortMode = () => {
        sortMode = ++sortMode % 3;
        dispatch("change", { sortMode })
    }

</script>

<button class="filter-button" on:click={changeSortMode}> 
    {#if sortMode == SortEnum.TIME}
        <i class="fa-regular fa-hourglass"></i><p>Sort by time</p>
    {:else if sortMode == SortEnum.EMOJI}
        <i class="fa-regular fa-face-smile"></i><p>Sort by emoji</p>
    {:else if sortMode == SortEnum.NAME}
        <i class="fa-solid fa-arrow-down-a-z"></i><p>Sort by name</p>
    {/if}
</button>

<style>
    .filter-button {
        width: 100%;

        background-color: transparent;
        border: transparent;
        border-top: 1px solid #ccc;

        display: flex;
        justify-content: center;
        
        padding: 0.5rem;
        
    }

    .filter-button p {
      font-size: 1em;
      font-weight: 650;

      margin: 1px;
    }

    .filter-button i {
      margin-top: auto;
      margin-bottom: auto;
      margin-right: 0.3rem;

      scale: 0.9;
    }
</style>