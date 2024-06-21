<!-- DraggableItem.svelte -->
<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { CraftNode } from "../types/CraftNode";

    const dispatch = createEventDispatcher();

    export let craftNode: CraftNode;

    export let inFusion = false;


    const handleClick = (event: MouseEvent) => {
        const clickEvent = {
            craftNode,
            x: event.clientX,
            y: event.clientY
        };
        dispatch('OnClick', clickEvent);
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="item {inFusion ? "glow-and-breathe" : ""}" on:mousedown={handleClick}>
    {craftNode?.text} {craftNode?.emoji}
</div>

<style>
    .item {
        cursor: grab;
        padding: 3px 8px 3px 8px;
        background-color: #f9f9f9;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: black;
        width: fit-content;

        -webkit-user-select: none; /* Chrome, Safari, Opera */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE, Edge */
        user-select: none; /* Standard syntax */
    }

    .item:hover {
        background-color: #cfe1f2;
    }


    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 5px transparent;
        }
        50% {
            box-shadow: 0 0 10px rgba(159, 159, 159, 0.4);
        }
    }

    @keyframes breathe {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    @keyframes disapear {
        0%, 100% {
            opacity: 0.4;
        }
        50% {
            opacity: 0.9;
        }
    }

    .glow-and-breathe {
        animation: glow 1s infinite, breathe 2s infinite, disapear 1s infinite;
    }

</style>
