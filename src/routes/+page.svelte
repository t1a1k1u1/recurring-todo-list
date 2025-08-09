<script lang="ts">
	import { goto } from '$app/navigation';
	import { firekitAuth, firekitUser } from 'svelte-firekit';

	$effect(() => {
		if (firekitUser.isAuthenticated) {
			goto('/tasks');
		}
	});

	async function handleSignIn() {
		try {
			const result = await firekitAuth.signInWithGoogle();
			console.log('Authentication success', result);
		} catch (err) {
			console.error('Authentication failed', err);
		}
	}
</script>

<h1 class="h1">Recurring Todo List</h1>

<div class="flex items-center justify-center">
	<button type="button" class="btn preset-tonal-primary" onclick={handleSignIn}
		>Sign in with Google</button
	>
</div>
