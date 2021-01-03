import React, { useState } from 'react';
import fetchRepos from '../fetchRepos';
import {
  Spinner,
  CloudDownloadIcon,
  TextInputField,
  Pane,
  Text,
  Pre
} from 'evergreen-ui';

import RepoList from '../components/RepoList';
import StateHook from '../domain/StateHook';
import GitHubProject from '../domain/GitHubProject';

import {
  Button
} from 'evergreen-ui';

const STARRED_REPOS_URL = 'https://api.github.com/user/starred';
const KEY_API_TOKEN = 'apiToken';

export default function Stars() {
  const [repos, setRepos] = useState([] as Array<GitHubProject>);
  const [loading, setLoading] = useState(false);
  const savedApiToken = localStorage.getItem(KEY_API_TOKEN) || '';
  const [apiToken, setApiToken] : StateHook<string> = useState(savedApiToken);

  function handleClick() {
    setLoading(true);
    fetchRepos(STARRED_REPOS_URL, apiToken)
    .then(repositories => {
      setRepos(repositories);
      setLoading(false);
    });
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setApiToken(e.target.value);
    localStorage.setItem(KEY_API_TOKEN, e.target.value);
  }

  return (
    <>
      <Pane display="column" padding={10} alignItems="center">
        <TextInputField
          name="text-input-token"
          label="GitHub Personal Token"
          onChange={handleOnChange}
          value={apiToken}
        />
        <Button
          iconBefore={CloudDownloadIcon}
          onClick={handleClick}
        >
          <Pre>Get Starred Repos</Pre>
        </Button>
      </Pane>
      { loading ? <Spinner /> : <RepoList projects={repos}/> }
    </>
  );
}
