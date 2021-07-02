<script>
	import TagTable from '../components/TagTable.svelte';
	import ToDoView from '../components/ToDoView.svelte';
	import PillPicker from '../components/PillPicker.svelte';
	import Modal from '../components/Modal.svelte';
	import supabase from '../../supabase';
	import { onMount } from 'svelte';

	async function getActivities() {
		if (user) {
			const { data: activities, error } = await supabase
				.from('activity')
				.select('*')
				.filter('user_id', 'eq', user.id);

			console.log(activities);
			if (error) alert(error.message);
			return activities;
		}
	}

	onMount(async () => {
		// sign user in
		const { user: u } = await supabase.auth.signIn({
			email: 'sladamoma@gmail.com',
			password: 'Camaro2010'
		});

		// load tags
		const { data: t } = await supabase.from('tag').select('*').filter('user_id', 'eq', u.id);

		tags = t;
		user = u;
		activitiesPromise = getActivities();
	});

	var resizing = false;
	var mouseStartX = 0;

	let sidebarWidth;
	let contentWidth;

	let modalActivity;
	let activitiesPromise;
	let selectedMode = 'To-Do';
	let selectedTag;
	let user = {};
	let tags = [];

	const shouldBlur = (ma) => {
		if (ma === undefined) return 'none';
		else return 'blur(12px)';
	};

	$: blurBackground = shouldBlur(modalActivity);

	console.log(blurBackground);

	function startResizing(e) {
		resizing = true;
		// get the starting mouse position
		mouseStartX = e.clientX;
	}

	function resize(e) {
		if (resizing) {
			// get the current mouse position
			const dx = e.clientX - mouseStartX;
			mouseStartX = e.clientX;

			// get the current width of the container
			const windowWidth = window.innerWidth;

			if (dx > 0) {
				let expectedSidebarWidth = sidebarWidth + dx;
				let expectedContentWidth = windowWidth - sidebarWidth;
				if (expectedSidebarWidth >= 275 && expectedSidebarWidth <= 400) {
					sidebarWidth = expectedSidebarWidth;
					contentWidth = expectedContentWidth;
				}
			}
			if (dx < 0) {
				let expectedContentWidth = contentWidth - dx;
				let expectedSidebarWidth = windowWidth - contentWidth;
				if (expectedSidebarWidth >= 275 && expectedSidebarWidth <= 400) {
					sidebarWidth = expectedSidebarWidth;
					contentWidth = expectedContentWidth;
				}
			}
		}
	}

	function stopResizing(e) {
		resizing = false;
		mouseStartX = 0;
	}
</script>

{#if modalActivity}
	<Modal
		on:escape={() => {
			modalActivity = undefined;
		}}
		on:upsert={async (e) => {
			// supabase upsert modalActivity
			console.log(modalActivity);
			const { data, error } = await supabase
				.from('activity')
				.upsert([{ ...modalActivity, user_id: user.id }]);

			activitiesPromise = getActivities();
			if (error) alert(error);
		}}
		{modalActivity}
	/>
{/if}
<main style="filter: {blurBackground}">
	<div class="chunk">adamsloma4321@gmail.com</div>
	<div class="nav">
		<PillPicker
			on:change={(pill) => {
				selectedMode = pill.detail.selected;
			}}
			options={['To-Do', 'Day', 'Week', 'Month']}
		/>
	</div>
	<!-- refers to the view of our "data", the sidebar and the content -->
	<div class="data">
		<div
			class="sidebar"
			style="width: {sidebarWidth}px"
			bind:clientWidth={sidebarWidth}
			on:mouseup={stopResizing}
			on:mousemove={resize}
		>
			<TagTable
				on:select={(t) => {
					const { name } = t.detail;
					selectedTag = name;
				}}
				{tags}
			/>
		</div>
		<div class="resizer" on:mousedown={startResizing} on:mousemove={resize} />
		<div
			class="content"
			style="width: {contentWidth}px"
			bind:clientWidth={contentWidth}
			on:mouseup={stopResizing}
			on:mousemove={resize}
		>
			{#if selectedMode === 'To-Do'}
				<!-- await block pulls activity rows from supabase -->
				{#await activitiesPromise then activities}
					<ToDoView
						on:addActivity={(e) => {
							const { tag } = e.detail;
							console.log(tag);
							modalActivity = {
								tags: [tag.name]
							};
						}}
						on:editActivity={(e) => {
							const { activity } = e.detail;
							console.log(activity);

							modalActivity = activity;
						}}
						on:update={async (e) => {
							const { data, error } = await supabase
								.from('activity')
								.upsert(e.detail)
								.eq('id', e.detail.id);
						}}
						{activities}
						tags={tags.filter((t) => t.name === selectedTag || selectedTag === undefined)}
					/>
				{/await}
			{:else if selectedMode === 'Day'}
				<!-- await block pulls activity rows from supabase with filter matching a specific day -->
			{:else if selectedMode === 'Week'}
				<!-- await block pulls activity rows from supabase with filter matching a specific week-->
			{:else if selectedMode === 'Month'}
				<!-- await block pulls activity rows from supabase with filter matching a specific month-->
			{/if}
		</div>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;900&display=swap');
	:root {
		--smokey-black: hsla(330, 10%, 8%, 1);
		--raisin-black: hsla(336, 7%, 15%, 1);
		--black-coffee: hsla(343, 6%, 21%, 1);
		--dark-liver: hsla(350, 4%, 31%, 1);
		--dim-gray: hsla(348, 2%, 40%, 1);
		--spanish-gray: hsla(345, 2%, 59%, 1);
		--silver: hsla(0, 2%, 78%, 1);
		--gainsboro: hsla(0, 1%, 87%, 1);
		--platinum: hsla(0, 2%, 92%, 1);
		--cultured: hsla(0, 0%, 96%, 1);
	}

	div {
		justify-content: center;
		align-items: center;
		font-family: 'Noto Sans JP', sans-serif;
	}

	main {
		display: grid;
		height: 100vh;
		grid-template-rows: 80px auto;
		grid-template-columns: 1fr 4fr;
	}

	.chunk {
		display: flex;
		margin-left: 8px;
		justify-content: flex-start;
		align-items: center;
		border-bottom: solid 1px var(--platinum);
	}

	.nav {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: solid 1px var(--platinum);
		padding-left: 100px;
	}

	.resizer {
		cursor: col-resize;
		height: 100%;
		background-color: var(--platinum);
	}

	.data {
		grid-column-start: 1;
		grid-column-end: 3;
		display: grid;
		grid-template-columns: 1fr 3px 4fr;
		grid-template-rows: 1fr;
	}

	.sidebar {
		height: 100%;
		min-width: 275px;
		max-width: 400px;
	}

	.content {
		height: 100%;
	}
</style>
