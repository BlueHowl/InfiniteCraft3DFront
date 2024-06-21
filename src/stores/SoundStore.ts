import { createLocalStorage, persist } from "@macfja/svelte-persistent-store";
import { writable, type Writable } from "svelte/store";

export const isSoundOnStore: Writable<boolean> = persist(writable(true), createLocalStorage(), "IsSoundOn") as Writable<boolean>;

export let IsSoundOn = true;

export const toggleSound = () => {
    isSoundOnStore.update(value => {
        value = !value;

        return value;
    });
}

isSoundOnStore.subscribe(value => {
    IsSoundOn = value;

    if(IsSoundOn) {
        import('../util/util').then(({ playPopSound }) => {
            playPopSound();
        });
    }
});