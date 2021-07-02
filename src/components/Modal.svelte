<script>
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	// props
	export let modalActivity;

	let title = modalActivity.title;
	let notes = modalActivity.notes;
	let invitees = modalActivity.invitees;
	let tags;

	const dispatch = createEventDispatcher();
</script>

<div transition:fade={{ duration: 150 }} class="overlay" on:click={() => dispatch('escape')}>
	<div transition:fly={{ y: 200, duration: 300 }} on:click|stopPropagation class="modal">
		<input
			bind:value={title}
			on:click|stopPropagation
			type="text"
			placeholder="Activity...what are you up to?"
			style="font-size: 18px;"
		/>
		<br />
		<input on:click|stopPropagation type="text" placeholder="tags" value={modalActivity.tags[0]} />
		<br />
		<textarea
			on:click|stopPropagation
			type="text"
			placeholder="Notes"
			style="height: 150px"
			bind:value={notes}
		/>
		<br />
		<input on:click|stopPropagation type="text" placeholder="Invitees" bind:value={invitees} />
		<br />

		<button on:click|stopPropagation>Start</button>
		<button
			on:click|stopPropagation={(e) => {
				modalActivity.title = title;
				// tags
				modalActivity.notes = notes;
				modalActivity.invitees = invitees;
				dispatch('upsert', modalActivity);
				dispatch('escape');
			}}>Schedule</button
		>
	</div>
</div>

<style>
	div {
		font-family: 'Noto Sans JP', sans-serif;
	}

	input,
	textarea {
		border: none;
		background-color: var(--cultured);
		font-family: 'Noto Sans JP', sans-serif;
		max-width: 95%;
		padding: 9px 12px;
		resize: none;
	}

	input:focus,
	textarea:focus {
		outline: none;
	}

	button {
		margin: 9px 12px;
	}

	.overlay {
		position: fixed; /* Sit on top of the page content */
		display: flex; /* Hidden by default */
		align-items: center;
		justify-content: center;
		width: 100%; /* Full width (cover the whole page) */
		height: 100%; /* Full height (cover the whole page) */
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(245, 245, 245, 0.6);
		z-index: 2;
	}

	.modal {
		min-height: 40%;
		min-width: 50%;
		background-color: var(--cultured);
		/* border: solid 1px var(--smokey-black); */
		border-radius: 5px;
		padding: 9px;
		filter: drop-shadow(0 0 0.8rem var(--silver));
	}
</style>
