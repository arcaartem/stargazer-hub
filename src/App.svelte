<script lang="ts">
	import { GitHubTokenStore } from "./GitHubTokenStore";
	import MissingGitHubToken from "./components/MissingGitHubToken.svelte";
	import GitHubStars from "./components/GitHubStars.svelte";

	let gitHubToken: string;

	const unsubscribe = GitHubTokenStore.subscribe(token => gitHubToken = token);
</script>

<main>
	<h1>Stargazer</h1>
	{#if gitHubToken === '' }
		<MissingGitHubToken />
	{:else}
		<GitHubStars token={gitHubToken}/>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>