import { writable } from "svelte/store";

export const isInFusionStateStore = writable<boolean>(false);

export const setInfusionState = (state: boolean) => {
    isInFusionStateStore.set(state);
}