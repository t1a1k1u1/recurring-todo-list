<script lang="ts">
	import type { Task } from '../types/task';
	import IconTrash from '@lucide/svelte/icons/trash';

	type Props = {
		task: Task;
		onDismiss: (task: Task) => void;
		onDelete: (task: Task) => void;
	};

	const { task, onDismiss, onDelete }: Props = $props();
</script>

<div
	class="w-full card preset-outlined-surface-950-50 grid grid-cols-1 items-center gap-4 p-4 lg:grid-cols-[1fr_auto]"
>
	<div>
		<p class="font-bold">{task.title}</p>
		<p class="text-xs opacity-60">
			interval: {task.intervalDays} days / next: {task.nextDueDate.toDate().toLocaleDateString()}
		</p>
	</div>
	<div class="flex gap-1">
		<button class="btn preset-tonal hover:preset-filled" onclick={() => onDismiss(task)}
			>Dismiss</button
		>
		<button class="btn hover:preset-tonal-primary" onclick={() => onDelete(task)}
			><IconTrash /></button
		>
	</div>
</div>
