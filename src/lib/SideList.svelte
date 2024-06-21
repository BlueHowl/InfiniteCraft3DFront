<script lang="ts">
    import { craftNodeListStore } from "../stores/CraftNodeStore";
    import Item from "./Item.svelte";
    import SearchInput from "./SearchInput.svelte";
    import { spawnDraggable } from "../util/util";
    import ToggleDiscovery from "./ToggleDiscovery.svelte";
    import FilterMenu from "./SortMenu.svelte";
    import { SortEnum } from "../enum/SortEnum";


    let search: string = '';
    let sortMode = SortEnum.TIME;
    let showNewOnly = false;

    const filterItems = (event: CustomEvent) => {
        search = event.detail.toLowerCase();   
    }

    $: filteredItems = $craftNodeListStore?.filter(cn => { 
        return cn.text.toLowerCase().includes(search); 
    })
    .filter((cn) => showNewOnly ? cn.isNew : true)
    .sort((a, b) => {
            if (sortMode === SortEnum.EMOJI) {
                return a.emoji.localeCompare(b.emoji);
            } else if (sortMode === SortEnum.TIME) {
                return a.createdAt - b.createdAt;
            } else {
                return a.text.localeCompare(b.text);
            }
    });

    const toggleNewOnly = () => {
        showNewOnly = !showNewOnly;
    };

    const changeSortMode = (event: CustomEvent) => {
        sortMode = event.detail.sortMode;
    }

</script>

<div class="sidebar">
    <div class="list-item">
        {#if filteredItems.length === 0}
            <div class="noitem"><p>No items</p></div>
        {/if}

        {#each filteredItems as item}
            <Item craftNode={item} on:OnClick={(e) => spawnDraggable(e.detail, {x: e.detail.x-35, y: e.detail.y-15}, 1)} />
        {/each}
    </div>

    <!-- <i class="fa-solid fa-magic-wand-sparkles"></i> -->

    <div class="filter-menu">
        <ToggleDiscovery on:toggle={toggleNewOnly} />
        <FilterMenu on:change={changeSortMode} />
    </div>
     
    <SearchInput on:search={filterItems} itemsLength={filteredItems.length} />
</div>

<style>
    .list-item {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        height: 100%;
        align-content: flex-start;

        gap: 0.5rem;
        overflow: auto;
        padding: 1rem;
    }

    .noitem {
        width: -webkit-fill-available;
    }
    .noitem p {
        text-align-last: center;
    }

    .sidebar {
        width: 450px;
        border-left: 1px solid #ccc;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .filter-menu {
        display: flex;
    }

</style>