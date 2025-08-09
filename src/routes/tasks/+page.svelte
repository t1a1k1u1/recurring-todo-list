<script lang="ts">
	import { goto } from '$app/navigation';
	import { firekitUser, firekitCollection } from 'svelte-firekit';
	import { where } from 'firebase/firestore';

	interface Task {
		id: string;
		userId: string;
		title: string;
		intervalDays: number;
		lastCompleted: Date;
		nextDueDate: Date;
	}

	$effect(() => {
		if (!firekitUser.isAuthenticated) {
			goto('/');
		}
	});

	const tasks = firekitCollection<Task>('tasks', [where('userId', '==', firekitUser.uid)]);
</script>

{#if firekitUser.isAuthenticated}
	<h1>Tasks</h1>

	{#if tasks.data}
		{#if tasks.data.length > 0}
			<ul>
				{#each tasks.data as task (task.id)}
					<li>
						<h2>{task.title}</h2>
						<p>Interval: {task.intervalDays} days</p>
						<p>Last Completed: {new Date(task.lastCompleted).toLocaleDateString()}</p>
						<p>Next Due: {new Date(task.nextDueDate).toLocaleDateString()}</p>
					</li>
				{/each}
			</ul>
		{:else}
			<p>You have no tasks.</p>
		{/if}
	{:else}
		<p>Loading tasks...</p>
	{/if}
{:else}
	<p>Loading...</p>
{/if}
