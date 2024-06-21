<script lang="ts">
    import DraggableItem from './DraggableItem.svelte';
    import { draggableNodeListStore, removeAllDraggableNode, removeDraggableNode } from '../stores/DraggableNodeStore';
    import ClickManager from './ClickManager.svelte';
    import { playTrashSound, spawnDraggable } from '../util/util';
    import SoundToggle from './SoundToggle.svelte';
    import IconButton from './IconButton.svelte';
    import IconWrapper from './IconWrapper.svelte';
    import { isDarkModeStore, toggleDarkMode } from '../stores/IsDarkModeStore';
    import Sun from './Sun.svelte';
    import { fade } from 'svelte/transition';
    import ResetButton from './ResetButton.svelte';

</script>

<div class="draggable-container" style="position: relative; width: 100%;">
    {#if $isDarkModeStore}
        <div 
        in:fade={{ duration: 333 }}
        out:fade={{ duration: 100 }} 
        style="position: absolute; left: 0rem; top: 0rem;">
            <Sun/>
        </div>
    {/if}

    {#each $draggableNodeListStore as draggableItem (draggableItem.id)} 
        <ClickManager 
            delay={300} 
            on:dblclick={() => {spawnDraggable(draggableItem, draggableItem.coordinate, 20)}}
            on:rightclick={() => {removeDraggableNode(draggableItem.id); playTrashSound();}}>
            <DraggableItem node={draggableItem} />
        </ClickManager>
    {/each}

    <div class="util-buttons-container">
        <div>
            <ResetButton />
        </div>

        <div class="util-buttons-subcontainer">
            <div>
                <IconWrapper>
                    <IconButton icon="fa-solid fa-circle-half-stroke" on:click={toggleDarkMode}/>
                </IconWrapper>
            </div>
            <div>
                <IconWrapper>
                    <IconButton icon="fa-solid fa-broom" on:click={removeAllDraggableNode}/>
                </IconWrapper>
            </div>
            <div>
                <IconWrapper>
                    <SoundToggle />
                </IconWrapper>
            </div>
        </div>
    </div>
</div>

<style>
    .util-buttons-container {
        display: flex;
        position: absolute; 
        right: 1rem; 
        left: 1rem;
        bottom: 0.75rem;

        justify-content: space-between;
    }

    .util-buttons-subcontainer > * {
        margin-right: 1rem;
    }

    .util-buttons-subcontainer > *:last-child {
        margin-right: 0;
    }

    .util-buttons-subcontainer {
        display: flex;
    }
</style>