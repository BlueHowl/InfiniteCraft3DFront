import { createLocalStorage, persist } from "@macfja/svelte-persistent-store";
import { writable, type Writable } from "svelte/store";

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
    } else {
        document.body.classList.remove('dark-theme')
    }
});