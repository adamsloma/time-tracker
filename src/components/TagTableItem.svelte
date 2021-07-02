<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let selected = false;
	export let name; // the name of the tag
	export let color; // the color of the tag
	export let hrs; // hrs per week, predetermined by parent components

	function dispatchSelectEvent(name, color) {
		dispatch('select', { name, color });
	}
</script>

<div
	on:click|stopPropagation={(e) => {
		selected = !selected;
		dispatchSelectEvent(name, color);
	}}
	class="item"
>
	<div style="background-color: {color};" class="info" class:selected>
		#
		{#if selected}
			<div on:click|stopPropagation class="name">{name}</div>
			<div on:click|stopPropagation class="hrs">{hrs} hrs/week</div>
		{/if}
	</div>

	{#if !selected}
		<div class="name">{name}</div>
		<div class="hrs">{hrs} hrs/week</div>
	{/if}
</div>

<style>
	.item {
		display: flex;
		align-items: center;
		margin: 10px;
	}

	.item:hover {
		cursor: pointer;
	}

	.info {
		padding: 0px 6px 0px 6px;
		border-radius: 5pt;
		font-size: 17pt;
		color: var(--cultured);
		font-weight: 900;
		display: flex;
		align-items: center;
	}

	.name {
		padding-left: 4px;
		flex-grow: 3;
		font-size: 14pt;
		font-weight: 400;
	}

	.hrs {
		font-size: 10pt;
		flex-grow: 1;
		text-align: right;
		font-weight: 400;
	}

	.selected {
		width: 100%;
	}

	.info:hover {
		cursor: pointer;
	}
</style>
