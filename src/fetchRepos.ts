import GitHubProject from './domain/GitHubProject'

export default function fetchRepos(url: string, token: string): Promise<Array<GitHubProject>> {
  return fetch('https://api.github.com/user/starred', {
    headers: {
      'Authorization': `token ${token}`
    }
  })
  .then(res => res.json());
}
