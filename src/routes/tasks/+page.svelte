<script lang="ts">
	import { goto } from '$app/navigation';
	import { firekitUser, firekitCollection } from 'svelte-firekit';
	import { where } from 'firebase/firestore';
	import type { Task } from '$lib/types/task';
	import TaskCard from '$lib/components/TaskCard.svelte';

	$effect(() => {
		if (!firekitUser.isAuthenticated) {
			goto('/');
		}
	});

	const tasksCollection = firekitCollection<Task>('tasks', [
		where('userId', '==', firekitUser.uid)
	]);
	const tasks = $derived(tasksCollection.data);

	const handleDismiss = (task: Task) => {
		console.log('Dismiss:', task);
	};

	const handleDelete = (task: Task) => {
		console.log('Delete:', task);
	};
</script>

{#if firekitUser.isAuthenticated}
	<h1 class="h1">Tasks</h1>

	{#each tasks as task (task.id)}
		<TaskCard {task} onDismiss={handleDismiss} onDelete={handleDelete} />
	{/each}
{:else}
	<p>Loading...</p>
{/if}

<pre>
	{JSON.stringify(tasks, null, 2)}
</pre>
