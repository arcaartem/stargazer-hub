type GitHubProject = {
  id: number;
  name: string;
  description: string;
  language: string;
  full_name: string;
  stargazers_count: number;
  watchers_count: number;
  open_issues_count: number;
  forks_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export default GitHubProject;

