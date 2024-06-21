import { writable, type Writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";
import type { CraftNode } from "../types/CraftNode";
import { createLocalStorage, persist } from "@macfja/svelte-persistent-store";


//     { id: uuidv4(), text: "💧 Water" },
//     { id: uuidv4(), text: "🔥 Fire" },
//     { id: uuidv4(), text: "🌍 Earth" },
//     { id: uuidv4(), text: "🌬️ Air" }

const baseElements = [
    { id: uuidv4(), text: "Water", emoji: "💧", tags: "Liquid, Flow, Life, Aqua, Drink, Drinkable, H2O, HUMID, WET, COLD", isNew: false, createdAt: 0 },
    { id: uuidv4(), text: "Fire", emoji: "🔥", tags: "Hot, Flame, Blaze, Inferno, Heat, Burn, Wildfire, Spark, Ember, Smoke, Combustion, Pyro", isNew: false, createdAt: 0 },
    { id: uuidv4(), text: "Earth", emoji: "🌍", tags: "Ground, Soil, Terra, Land, Planet, Gaia, Earthquake, Geology, Terrain, Dust", isNew: false, createdAt: 0 },
    { id: uuidv4(), text: "Air", emoji: "🌬️", tags: "Wind, Sky, Atmosphere, Breeze, Oxygen, Breath, Gust, Clouds, Aerodynamics, Fresh", isNew: false, createdAt: 0 }
  ]

export const craftNodeListStore: Writable<CraftNode[]> = persist(writable(baseElements), createLocalStorage(), "CNList") as Writable<CraftNode[]>;


// Function to add a new CraftNode to the store if it doesn't already exist
export const addCraftNode = (text: string, emoji: string, tags?: string, modelUrl?: string,): CraftNode => {
    let existingNode: CraftNode | undefined;
  
    // Update store with the new node if it doesn't exist already
    craftNodeListStore.update((nodes) => {
      existingNode = nodes.find(node => node.text.trim() === text.trim());
  
      if (!existingNode) {
        const newNode = { 
          id: uuidv4(), 
          text: text.trim(), 
          emoji, 
          tags, 
          modelUrl, 
          isNew: true, 
          createdAt: new Date().getTime()
        };
        
        nodes.push(newNode);

        existingNode = newNode;
      }
  
      return nodes;
    });
  
    return existingNode!;
  };

// Function to add an already discovered CraftNode to the store if it doesn't already exist
export const addDiscoveredCraftNode = (cn: CraftNode): CraftNode => {

  let existingNode: CraftNode | undefined;

  // Update store with the new node if it doesn't exist already
  craftNodeListStore.update((nodes) => {
    existingNode = nodes.find(node => node.text.trim() === cn.text.trim());

    if (!existingNode) {
      nodes.push(cn);
      existingNode = cn;
    }

    return nodes;
  });

  return existingNode!;
}

export const removeAllCraftNode = () => {
  craftNodeListStore.set(baseElements);
}