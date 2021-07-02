<script>
	import ToDoCard from './TodoCard.svelte';
	export let activities;
	export let tags;
</script>

<div class="view">
	{#each tags as tag}
		<!-- filters activities by tag -->
		<ToDoCard
			on:addActivity
			on:editActivity
			on:update
			activities={activities.filter((a) => a.tags.includes(tag.name))}
			{tag}
		/>
	{/each}
</div>

<style>
	.view {
		display: flex;
		flex-wrap: wrap;
	}
</style>
