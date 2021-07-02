<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let options;
	let selected = options[0];

	function dispatchChangeEvent(option) {
		dispatch('change', { selected: option });
	}
</script>

{#each options as option}
	<div
		class="pill"
		class:selected={selected === option}
		on:click={() => {
			selected = option;
			dispatchChangeEvent(option);
		}}
	>
		{option}
	</div>
{/each}

<style>
	.pill {
		margin: 4px;
		padding: 4px;
		border: none;
		border-radius: 5pt;
		background-color: var(--spanish-gray);
		color: var(--cultured);
	}

	.selected {
		margin: 4px;
		padding: 4px;
		border: none;
		border-radius: 5pt;
		background-color: var(--smokey-black);
		color: var(--cultured);
	}

	.pill:hover {
		cursor: pointer;
	}
</style>
