<script>
	import { createEventDispatcher } from 'svelte';

	export let checked = false;
	export let color;

	// dispatch an on:change event that sends out the new value of 'checked'
	const dispatch = createEventDispatcher();
</script>

<span
	class="checkbox"
	on:click={() => {
		checked = !checked;
		dispatch('check', { checked });
	}}
>
	{#if !checked}
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="5" cy="5" r="5" fill={color} />
		</svg>
	{:else}
		<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12 2L5.125 14L2 8.54545"
				stroke={color}
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{/if}
</span>

<style>
	.checkbox:hover {
		cursor: pointer;
	}

	.checkbox {
		width: 10px;
		height: 20px;
	}
</style>
