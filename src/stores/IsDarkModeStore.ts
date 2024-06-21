import { createLocalStorage, persist } from "@macfja/svelte-persistent-store";
import { writable, type Writable } from "svelte/store";
import { changeFavicon } from "../util/util";

export const isDarkModeStore: Writable<boolean> = persist(writable(true), createLocalStorage(), "IsDarkMode") as Writable<boolean>;

export const toggleDarkMode = () => {
    isDarkModeStore.update(value => {
        value = !value;

        return value;
    });
}

isDarkModeStore.subscribe(value => {
    if(value) {
        document.body.classList.add('dark-theme')
        changeFavicon('/infinite-logo-black.ico');
    } else {
        document.body.classList.remove('dark-theme')
        changeFavicon('/infinite-logo-white.ico');
    }
});