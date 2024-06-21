<!-- SearchInput.svelte -->
<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { writable } from "svelte/store";

    const dispatch = createEventDispatcher();
    const searchText = writable('');

    export let itemsLength = 0;

    const onInput = (e: any) => {
        searchText.set(e.target.value);
        dispatch('search', e.target.value);
    }

    const clearInput = () => {
        searchText.set('');
        dispatch('search', '');
    }
</script>

<div class="search-container">
    <i class="magnify fas fa-search"></i>
    <input 
        type="text" 
        placeholder="Search ({itemsLength}) items..." 
        on:input={onInput} 
        bind:value={$searchText}
    />
    {#if $searchText}
        <i class="fas fa-times clear-icon" on:click={clearInput} on:keypress={clearInput}></i>
    {/if}
</div>

<style>
    .search-container {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }

    .search-container .magnify {
        position: absolute;
        left: 10px;
        font-size: 1rem;
        color: #888;
    }

    .search-container input {
        width: 100%;
        padding: 10px 30px 10px 30px; /* Add padding to leave space for the icons */
        
        border: 1px solid #ccc;
        border-bottom: transparent;
        border-left: transparent;
        border-right: transparent;

        box-sizing: border-box;
        font-size: 1rem;
        outline: none;
        background-color: transparent;
    }

    .clear-icon {
        position: absolute;
        right: 10px;
        font-size: 1rem;
        color: #888;
        cursor: pointer;
    }
</style>
