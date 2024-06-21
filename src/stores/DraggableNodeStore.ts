import { writable } from "svelte/store";
import type { CraftNode } from "../types/CraftNode";
import type { DraggableNode } from "../types/DraggableNode";
import type { Coordinate } from "../types/Coordinate";
import { playTrashSound } from "../util/util";

//Store de gestion d'état de la barre de chargement
export const draggableNodeListStore = writable<DraggableNode[]>([]);

let i = 0;

//Ajout d'un CraftNode dans la liste
export const addDraggableNode = (cnode: CraftNode, coordinate: Coordinate): DraggableNode => {
  const node = { id: ++i, craftNode: cnode, coordinate, inFusion: false };

  draggableNodeListStore.update((nodes) => {
      
      nodes.push(node);

      return nodes;
  });

  return node;
}

// Function to update a draggable node's position
export const updateDraggableNodePosition = (id: number, coordinate: Coordinate) => {
  draggableNodeListStore.update((nodes) => {
    const node = nodes.find((n) => n.id === id);
    if (node) {
      node.coordinate = coordinate;
    }
    return nodes;
  });
};

export const setDraggableNodeInFusion = (id: number) => { 
    draggableNodeListStore.update((nodes) => {
        const node = nodes.find((n) => n.id === id);
        if (node) {
            node.inFusion = true;
        }
        return nodes;
    });
}

export const removeDraggableNode = (id: number) => {
    draggableNodeListStore.update((nodes) => {
        return nodes.filter((n) => n.id !== id);
    });
}

export const removeAllDraggableNode = () => {
  draggableNodeListStore.set([]);

  playTrashSound();
}