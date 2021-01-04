import GitHubProject from './domain/GitHubProject'

export default function fetchRepos(token: string): Promise<Array<GitHubProject>> {
  return fetch('https://api.github.com/user/starred', {
    headers: {
      'Authorization': `token ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error while fetching starred repositories');
      }

      return response.json();
    });
}
