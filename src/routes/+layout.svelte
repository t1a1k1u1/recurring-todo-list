<script>
	import { FirebaseApp } from 'svelte-firekit';
	let { children } = $props();
</script>

<FirebaseApp>
	{@render children()}
</FirebaseApp>
