import { checkCombination, checkCraftNode, storeCombination } from "../services/CombinationService";
import { generateNewValue } from "../services/GeminiService";
import { addCraftNode, addDiscoveredCraftNode } from "../stores/CraftNodeStore";
import { addDraggableNode, removeDraggableNode, updateDraggableNodePosition } from "../stores/DraggableNodeStore";
import type { Coordinate } from "../types/Coordinate";
import type { CraftNode } from "../types/CraftNode";
import type { DraggableNode } from "../types/DraggableNode";
import { Sound } from "./Sound";

export const spawnDraggable = (e: CustomEvent|DraggableNode, coordinate?:Coordinate, randomness?: number) => {
    const cn = e instanceof CustomEvent ? e.detail : e.craftNode;
    //console.log('Spawning draggable item:', cn);

    const scale = (randomness || 200);

    const randX = Math.floor((Math.random() * scale) + (coordinate?.x! || window.innerWidth / 2));
    const randY = Math.floor((Math.random() * scale) + (coordinate?.y! || window.innerHeight / 2));

    addDraggableNode(cn, { x: randX, y: randY});

    popSound?.play();
};

export const checkIntersection = (element: HTMLElement, toAvoid: HTMLElement, node: DraggableNode, coordinate: Coordinate) => {
    const draggableRect = element.getBoundingClientRect();
    const toAvoidRect = toAvoid.getBoundingClientRect();

    if (
        coordinate.x < toAvoidRect.right &&
        coordinate.x + draggableRect.width > toAvoidRect.left &&
        coordinate.y < toAvoidRect.bottom &&
        coordinate.y + draggableRect.height > toAvoidRect.top
    ) {
        playTrashSound();
        //console.log('Removing item', node);
        removeDraggableNode(node.id);
    }
};


export const getFusion = async (sourceNode: CraftNode, targetNode: CraftNode): Promise<CraftNode> => {
    let cn = await checkCombination(sourceNode.text.trim(), targetNode.text.trim());

    //Si combinaison déjà découverte ou craftNode déjà existant
    if(cn) {
        popSound?.play();

        return addDiscoveredCraftNode(cn);
    }

    let result;

    //si combinaison n'existe pas
    if(!cn) {

        const input = {
            str1: {text: sourceNode.text, tags: sourceNode.tags}, 
            str2: {text: targetNode.text, tags: targetNode.tags}
        }

        result = JSON.parse(await generateNewValue(input) || "{}");

        cn = await checkCraftNode(result?.text?.trim() || "");

        if(cn) {
            //stocke la combinaison découverte dans la base de données dont la craftNode correspondante existe déjà
            await storeCombination(sourceNode.text.trim(), targetNode.text.trim(), cn); 

            addDiscoveredCraftNode(cn);
        } else {
            cn = addCraftNode(result?.text?.trim() || "", result?.emoji?.trim() || "", result?.tags || "()");
    
            await storeCombination(sourceNode.text.trim(), targetNode.text.trim(), cn); //stocke la combinaison découverte dans la base de données

            discoverSound?.play();
        }
    }

    return cn;
};

export const changeFavicon = (path: string) => {
    const faviconElement = document.getElementById('favicon') as HTMLLinkElement;
    faviconElement.href = path;
  }

export const playTrashSound = () => {
    trashSound?.play();
}

export const playPopSound = () => {
    popSound?.play();
}


let popSound: Sound | null = null;
let trashSound: Sound | null = null;
let discoverSound: Sound | null = null;

(async () => {
    popSound = new Sound('pop.mp3');
    await popSound.load();

    trashSound = new Sound('trash.mp3');
    await trashSound.load();

    discoverSound = new Sound('discover.mp3');
    await discoverSound.load();
})();