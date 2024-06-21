<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let waiting = false;
	let timeout: any = null;
	export let delay = 600;

	const handleClickType = () => {
		if (waiting) {
			clearTimeout(timeout);
			dispatch('dblclick');
			waiting = false;
			return;
		}
		waiting = true;
		timeout = setTimeout(() => {
			dispatch('sglclick');
			waiting = false;
		}, delay);
	}

	const handleRightClick = (event: MouseEvent) => {
		event.preventDefault();
		dispatch('rightclick');
	}
</script>

<div 
	on:click={handleClickType} 
	on:keypress={handleClickType}
	on:contextmenu={handleRightClick}>
	<slot />
</div>