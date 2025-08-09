<script>
	import { FirebaseApp } from 'svelte-firekit';
	import '../app.css';
	let { children } = $props();
</script>

<FirebaseApp>
	{@render children()}
</FirebaseApp>
