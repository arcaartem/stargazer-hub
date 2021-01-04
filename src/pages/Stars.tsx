import React, { useState } from 'react';
import fetchRepos from '../fetchRepos';
import {
  Spinner,
  CloudDownloadIcon,
  TextInputField,
  Pane,
  Pre, Dialog
} from 'evergreen-ui';

import RepoList from '../components/RepoList';
import StateHook from '../domain/StateHook';
import GitHubProject from '../domain/GitHubProject';

import {
  Button
} from 'evergreen-ui';

const KEY_API_TOKEN = 'apiToken';

export default function Stars() {
  const [repos, setRepos] = useState([] as Array<GitHubProject>);
  const [loading, setLoading] = useState(false);
  const savedApiToken = localStorage.getItem(KEY_API_TOKEN) || '';
  const [apiToken, setApiToken] : StateHook<string> = useState(savedApiToken);
  const [hasError, setHasError] = useState(false);

  function handleClick() {
    setHasError(false);
    setLoading(true);
    localStorage.setItem(KEY_API_TOKEN, apiToken);
    fetchRepos(apiToken)
      .then(repositories => {
        setRepos(repositories);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setLoading(false));
  }

  function ErrorMessage() {
    return (
      <Pane>
        <Dialog isShown={hasError}
                title="Error"
                intent="danger"
                hasCancel={false}
                confirmLabel="Close"
                onConfirm={() => setHasError(false)}
                >
          An error has occurred while fetching starred repositories. Please try again later.
        </Dialog>
      </Pane>
    )
  }

  return (
    <>
      <Pane display="flex" padding={10} alignItems="center">
        <TextInputField
          width="50%"
          name="text-input-token"
          label="GitHub Personal Token"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiToken(e.target.value)}
          value={apiToken}
        />
        <Button
          marginLeft="1em"
          iconBefore={CloudDownloadIcon}
          onClick={handleClick}
        >
          <Pre>Get Starred Repos</Pre>
        </Button>
      </Pane>
      { hasError && <ErrorMessage /> }
      { !hasError && loading ? <Spinner /> : <RepoList projects={repos}/> }
    </>
  );
}
