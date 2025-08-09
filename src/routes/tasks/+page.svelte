<script lang="ts">
	import { goto } from '$app/navigation';
	import { firekitUser, firekitCollection } from 'svelte-firekit';
	import { Timestamp, where } from 'firebase/firestore';
	import IconTrash from '@lucide/svelte/icons/trash';

	interface Task {
		id: string;
		userId: string;
		title: string;
		intervalDays: number;
		lastCompleted: Timestamp;
		nextDueDate: Timestamp;
	}

	$effect(() => {
		if (!firekitUser.isAuthenticated) {
			goto('/');
		}
	});

	const tasksCollection = firekitCollection<Task>('tasks', [
		where('userId', '==', firekitUser.uid)
	]);
	const tasks = $derived(tasksCollection.data);
</script>

{#if firekitUser.isAuthenticated}
	<h1 class="h1">Tasks</h1>

	<table class="table caption-bottom">
		<thead>
			<tr>
				<th>Title</th>
				<th>Interval (days)</th>
				<th>Next Due Date</th>
			</tr>
		</thead>
		<tbody>
			{#each tasks as task (task.id)}
				<tr>
					<td>{task.title}</td>
					<td>{task.intervalDays}</td>
					<td>{task.nextDueDate.toDate().toLocaleDateString()}</td>
					<td
						><button type="button" class="btn hover:preset-tonal-primary"><IconTrash /></button></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>Loading...</p>
{/if}
