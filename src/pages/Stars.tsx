import React, { useState } from 'react';
import fetch from 'node-fetch';
import {
  Spinner,
  CloudDownloadIcon,
  TextInputField,
  Pane,
  Text,
  Pre
} from 'evergreen-ui';

import RepoList, { StateHook } from '../components/RepoList';

import {
  Button
} from 'evergreen-ui';

export default function Stars() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const savedApiToken = localStorage.getItem('apiToken') || '';
  const [apiToken, setApiToken] : StateHook<string> = useState(savedApiToken);

  function handleClick() {
    setLoading(true);
    fetch('https://api.github.com/user/starred', {
      headers: {
        'Authorization': `token ${apiToken}`
      }
    })
      .then(res => res.json())
      .then(json => {
        setRepos(json);
        setLoading(false);
      });
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setApiToken(e.target.value);
    localStorage.setItem('apiToken', e.target.value);
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
