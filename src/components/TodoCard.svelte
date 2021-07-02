<script>
	import Checkbox from './Checkbox.svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition'; // eventually make like a rotating inward transition

	export let tag;
	export let activities;
	const dispatch = createEventDispatcher();
</script>

<div
	transition:fly={{ x: 50, y: 50, duration: 100 }}
	style="border: solid 5px {tag.color}; background-color: {tag.color}"
	class="card"
>
	<h1>
		# {tag.name}
	</h1>
	{#each activities as activity}
		<div class="activity-item">
			<Checkbox
				checked={activity.done}
				color={'#f5f5f5'}
				on:check={async (e) => {
					// change the LOCAL activity in the way we want it to change, send the changed activity up
					activity.done = e.detail.checked;
					dispatch('update', activity);
				}}
			/>
			<span on:click={() => dispatch('editActivity', { activity })}>
				{activity.title}
			</span>
		</div>
	{/each}
	<div class="activity-item">
		<span
			class="plus-button"
			on:click={() => {
				dispatch('addActivity', { tag });
			}}
		>
			<svg
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6 1V11M1 6H11"
					stroke={'#f5f5f5'}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
	</div>
</div>

<style>
	.card {
		border-radius: 5pt;
		min-width: 275px;
		margin: 10px;
		filter: drop-shadow(3px 5px 0.7rem var(--platinum));
	}

	h1 {
		margin: 8px 7px;
		font-weight: 500;
		border-radius: 5px;
		color: var(--cultured);
		padding: 3px;
	}

	.activity-item {
		margin: 10px 5px;
		color: var(--cultured);
		font-weight: 300;
	}

	.plus-button:hover,
	span:hover {
		cursor: pointer;
	}
</style>
