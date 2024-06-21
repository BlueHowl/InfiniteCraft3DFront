import type { CraftNode } from "./CraftNode";

export type DraggableNode = { 
    id: number;
    craftNode: CraftNode; 
    coordinate: { x: number, y: number } 
    inFusion: boolean;
};