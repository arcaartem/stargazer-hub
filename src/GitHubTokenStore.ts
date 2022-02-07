import { writable } from "svelte/store";

const storeKey = "GitHubToken";
const storedGitHubToken = localStorage.getItem(storeKey) || '';

export const GitHubTokenStore = writable(storedGitHubToken);

GitHubTokenStore.subscribe(token => localStorage.setItem(storeKey, token));