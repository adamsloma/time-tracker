<script>
	import { createEventDispatcher } from 'svelte';

	import TagTableItem from './TagTableItem.svelte';
	// a list of tags which are of shape { name, color }, where color is a hex string
	export let tags;
	let selected = ''; // refers to an index in the tag list

	const dispatch = createEventDispatcher();
	function forward(e) {
		dispatch('select', e.detail);
	}
</script>

<div
	on:click={(e) => {
		selected = '';
		forward(e);
	}}
>
	{#each tags as tag}
		<TagTableItem
			selected={selected === tag.name}
			name={tag.name}
			color={tag.color}
			hrs={3}
			on:select={(e) => {
				selected = e.detail.name;
				forward(e);
			}}
		/>
	{/each}
</div>

<style>
	div {
		height: 100%;
	}
</style>
