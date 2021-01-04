import React, { useState } from 'react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretDownIcon,
  Table,
  TextDropdownButton,
} from 'evergreen-ui';

import GitHubProject from '../domain/GitHubProject';
import StateHook from '../domain/StateHook';

type RepoListProps = {
  projects: Array<GitHubProject>;
};

type OrderState = {
  orderedColumn: number;
  ordering: Order;
}

enum Order {
  NONE = 'NONE',
  ASC = 'ASC',
  DESC = 'DESC'
}

const columnDefinitions: { [key in keyof GitHubProject]?: string; } = {
  id: 'Id',
  full_name: 'Full Name',
  description: 'Description',
  language: 'Language',
  stargazers_count: 'Stargazers',
  watchers_count: 'Watchers',
  open_issues_count: 'Open Issues',
  forks_count: 'Forks',
  size: 'Size',
  created_at: 'Created At',
  updated_at: 'Updated At',
  pushed_at: 'Pushed At',
}

const columns: Array<keyof GitHubProject> = [
  'full_name',
  'description',
  'language',
  'watchers_count',
  'updated_at',
];

function comparison(a: any, b: any) {
  return a===b ? 0 : (a > b ? 1 : -1);
}

function getIconForOrder(order: Order) {
  switch (order) {
    case Order.ASC:
      return ArrowUpIcon
    case Order.DESC:
      return ArrowDownIcon
    default:
      return CaretDownIcon
  }
}

export default function RepoList({ projects }: RepoListProps) {
  const [orderState, setOrderState]: StateHook<OrderState> = useState({ orderedColumn: 0, ordering: Order.NONE } as OrderState);
  const { ordering, orderedColumn } = orderState;

  const items = sortProjects();

  function sortProjects() {
    if (ordering === Order.NONE) return projects;

    let propKey: keyof GitHubProject = columns[orderedColumn];
    return projects.sort((a: GitHubProject, b: GitHubProject) => {
      let aValue = a[propKey] || '';
      let bValue = b[propKey] || '';
      let comparisonResult = comparison(aValue, bValue);

      return (ordering === Order.ASC) ? comparisonResult : -1 * comparisonResult;
    });
  }

  function handleHeaderCellClick(columnNumber: number) {
    let newOrdering = orderedColumn === columnNumber ? (ordering === Order.ASC ? Order.DESC : Order.ASC): Order.ASC;
    setOrderState({
      orderedColumn: columnNumber,
      ordering: newOrdering
    });
  }

  function HeaderCell({ header, columnNumber }: { header: string, columnNumber: number }) {

    return (
      <Table.TextHeaderCell>
          <TextDropdownButton
            icon={
              orderedColumn === columnNumber
                ? getIconForOrder(ordering)
                : CaretDownIcon
            }
            onClick={ () => { handleHeaderCellClick(columnNumber); }
            }
          >
            {header}
          </TextDropdownButton>
      </Table.TextHeaderCell>
    );
  }

  function renderRow(project: GitHubProject) {
    return (
      <Table.Row key={project.id}>
        {
          columns.map((column: keyof GitHubProject, index: number) => {
            return (
              <Table.TextCell key={ index }>{project[column]}</Table.TextCell>
            );
          })
        }
      </Table.Row>
    )
  }

  function renderHeader(column: keyof GitHubProject, index: number) {
    const label: string = columnDefinitions[column] || column;

    return (
      <HeaderCell
        key={ index }
        header={ label }
        columnNumber={ index }
      />
    );

  }

  return (
    <Table border>
      <Table.Head>
        {columns.map(renderHeader)}
      </Table.Head>
      <Table.VirtualBody height={640}>
        {items.map(renderRow)}
      </Table.VirtualBody>
    </Table>
  );
}
