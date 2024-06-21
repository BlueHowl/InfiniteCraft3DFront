<script lang="ts">
    import Item from "./Item.svelte";
    import { addDraggableNode, getDraggableNodeCoordinates, removeDraggableNode, setDraggableNodeInFusion, updateDraggableNodePosition } from "../stores/DraggableNodeStore";
    import type { DraggableNode } from "../types/DraggableNode";
    import { onMount } from "svelte";
    import { checkIntersection, getFusion } from "../util/util";
  
    export let node: DraggableNode;

    //export let inFusion = false;

    let element: HTMLElement;
    let sidebar: HTMLElement;
  
    let offsetX = 0;
    let offsetY = 0;

  
    const handleDragStart = (event: DragEvent) => {
      const rect = (event.target as HTMLElement).getBoundingClientRect();

      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
      
      event.dataTransfer?.setData("application/json", JSON.stringify(node));
    }
  
    const handleDragEnd = (event: DragEvent) => {
      const rect = element.getBoundingClientRect();
      const offsetX = rect.width / 2;
      const offsetY = rect.height / 2;

      const finalX = event.clientX - offsetX;
      const finalY = event.clientY - offsetY;

      const coordinate = { x: finalX, y: finalY};
      
      checkIntersection(element, sidebar, node, coordinate);

      updateDraggableNodePosition(node.id, coordinate);
    }
  
    const handleDrop = async (event: DragEvent) => {
      event.preventDefault();
      
      const sourceNodeData = event.dataTransfer?.getData("application/json");
      if (!sourceNodeData) return;
  
      const sourceNode: DraggableNode = JSON.parse(sourceNodeData);

      if(sourceNode.id === node.id) return;

      await handleMerge(node, sourceNode);
    }

    const handleMerge = async (targetNode: DraggableNode, sourceNode: DraggableNode) => {
      setDraggableNodeInFusion(targetNode.id);
      setDraggableNodeInFusion(sourceNode.id);

      if (targetNode && sourceNode && targetNode !== sourceNode) {
        const newCraftNode = await getFusion(sourceNode.craftNode, targetNode.craftNode);
        if (newCraftNode) {
            removeDraggableNode(sourceNode.id);
            removeDraggableNode(targetNode.id);
    
            addDraggableNode(
                newCraftNode,
                targetNode.coordinate
            );
        }
      }
    }
  
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    onMount(() => {
        sidebar = document.querySelector('.sidebar')!;
    });
  </script>
  
  <div
    bind:this={element}
    class="draggable-holder"
    draggable={!node.inFusion}
    on:dragstart={handleDragStart}
    on:dragend={handleDragEnd}
    on:drop={handleDrop}
    on:dragover={handleDragOver}
    style=" left: {node.coordinate.x}px; top: {node.coordinate.y}px;"
  >
    <Item craftNode={node.craftNode} inFusion={node.inFusion} />

    {#if node.craftNode.isNew}
      <div>
        <i class="fa-solid fa-magic-wand-sparkles fa-2xs"></i><p>First discovery</p>
      </div>
    {/if}
  </div>
  
  <style>
    .draggable-holder {
      position: absolute;
      width: max-content;
      scale: 1.25;
      
      cursor: grab;
      background-color: transparent;

      display: flex;
      flex-direction: column !important;
      align-items: center;
    }

    .draggable-holder div {
      display: flex;
      justify-content: center;
      
      box-sizing: border-box;
      padding: 2px;
    }

    .draggable-holder p {
      font-size: 0.6rem;
      font-weight: 650;

      margin: 1px;
    }

    .draggable-holder i {
      margin-top: auto;
      margin-bottom: auto;

      scale: 0.8;
    }

  </style>
  