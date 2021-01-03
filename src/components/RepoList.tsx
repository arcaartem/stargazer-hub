import React, { useState } from 'react'
import { filter } from 'fuzzaldrin-plus';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Avatar,
  CaretDownIcon,
  IconButton,
  Menu,
  MoreIcon,
  Popover,
  Position,
  Table,
  Text,
  TextDropdownButton,
} from 'evergreen-ui';

enum Order {
  NONE = 'NONE',
  ASC = 'ASC',
  DESC = 'DESC'
}

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName];
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

function comparison(a: any, b: any) {
  return a===b ? 0 : (a > b ? 1 : -1);
}

function filterProjects(projects: Array<GitHubProject>, searchQuery: string) {
  if (searchQuery.length === 0) return projects;

  return projects.filter(project => {
    const result = filter([project.full_name], searchQuery);
    return result.length === 1;
  });
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

const columnOptions: Array<MenuOption> = [
  { label: 'Id', column2Show: 'id' },
  { label: 'Name', column2Show: 'full_name' },
  { label: 'Language', column2Show: 'language' },
  { label: 'Stargazers', column2Show: 'stargazers_count' },
  { label: 'Watchers', column2Show: 'watchers_count' },
  { label: 'Open Issues', column2Show: 'open_issues_count' },
  { label: 'Forks', column2Show: 'forks_count' },
  { label: 'Size', column2Show: 'size' },
  { label: 'Created At', column2Show: 'created_at' },
  { label: 'Updated At', column2Show: 'updated_at' },
  { label: 'Pushed At', column2Show: 'pushed_at' },
];

function findColumnOption(value: keyof GitHubProject, defaultOption: MenuOption = columnOptions[3]): MenuOption {
  return columnOptions.find(option => option.column2Show === value) || defaultOption;
}

type RepoListProps = {
  projects: Array<GitHubProject>;
};

export type StateHook<T> = [T, (value: T) => void];

type OrderState = {
  orderedColumn: number;
  ordering: Order;
}

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

type MenuOption = {
  label: string;
  column2Show: keyof GitHubProject;
}

export default function RepoList(props: RepoListProps) {
  const [orderState, setOrderState]: StateHook<OrderState> = useState({ orderedColumn: 1, ordering: Order.NONE } as OrderState);
  const [searchQuery, setSearchQuery]: StateHook<string> = useState('');
  const [menuOption, setColumn2Show]: StateHook<MenuOption> = useState(findColumnOption('stargazers_count'));
  const { ordering, orderedColumn } = orderState;
  const { projects } = props;
  const { label, column2Show } = menuOption;

  const sortedProjects = sortProjects();
  const items = filterProjects(sortedProjects, searchQuery.trim());

  function sortProjects() {
    if (ordering === Order.NONE) return projects

    let propKey: keyof GitHubProject = 'description'
    switch (orderedColumn) {
      case 2:
        propKey = 'language';
        break;
      case 3:
        propKey = column2Show;
        break;
    }

    return projects.sort((a: GitHubProject, b: GitHubProject) => {
      let aValue = getProperty(a, propKey as keyof GitHubProject);
      let bValue = getProperty(b, propKey as keyof GitHubProject);
      let comparisonResult = comparison(aValue, bValue);

      return (ordering === Order.ASC) ? comparisonResult : -1 * comparisonResult;
    });
  }

function HeaderMenu({ columnNumber, close }: {columnNumber: number, close: Function}) {
    return (
      <Menu>
        <Menu.OptionsGroup
          title="Order"
          options={[
            { label: 'Ascending', value: Order.ASC },
            { label: 'Descending', value: Order.DESC }
          ]}
          selected={ orderedColumn === columnNumber ? ordering : null }
          onChange={value => {
            setOrderState({
              orderedColumn: columnNumber,
              ordering: value
            });
            close();
          }}
        />
      </Menu>
    );
  }

  function ValueHeaderMenu({ close }: {close: any}) {
    return (
      <Menu>
        <Menu.OptionsGroup
          title="Order"
          options={[
            { label: 'Ascending', value: Order.ASC },
            { label: 'Descending', value: Order.DESC }
          ]}
          selected={
            orderedColumn === 3 ? ordering : null
          }
          onChange={value => {
            setOrderState({ orderedColumn: 3, ordering: value });
            close();
          }}
        />

        <Menu.Divider />

        <Menu.OptionsGroup
          title="Show"
          options={columnOptions.map(option => ({label: option.label, value: option.column2Show}))}
          selected={column2Show}
          onChange={value => {
            const columnOption = findColumnOption(value);
            setColumn2Show(columnOption);
            close();
          }}
        />
      </Menu>
    );
  }

function HeaderCell({ header, columnNumber, menu }: { header: string, columnNumber: number, menu?: any }) {
    return (
      <Table.TextHeaderCell>
        <Popover
          position={Position.BOTTOM_LEFT}
          content={menu}
        >
          <TextDropdownButton
            icon={
              orderedColumn === columnNumber
                ? getIconForOrder(ordering)
                : CaretDownIcon
            }
          >
            {header}
          </TextDropdownButton>
        </Popover>
      </Table.TextHeaderCell>
    );
  }

  function renderRow(project: GitHubProject) {
    return (
      <Table.Row key={project.id}>
        <Table.Cell display="flex" alignItems="center">
          <Text marginLeft={8} size={300} fontWeight={500}>
            {project.full_name}
          </Text>
        </Table.Cell>
        <Table.TextCell>{project.description}</Table.TextCell>
        <Table.TextCell>{project.language}</Table.TextCell>
        <Table.TextCell>{getProperty(project, column2Show)}</Table.TextCell>
      </Table.Row>
    )
  }

  return (
      <Table border>
        <Table.Head>
          <Table.SearchHeaderCell onChange={setSearchQuery} value={searchQuery} />
          <HeaderCell header="Description" columnNumber={1} menu={(close: Function) => <HeaderMenu columnNumber={1} close={close}/>} />
          <HeaderCell header="Language" columnNumber={2} menu={(close: Function) => <HeaderMenu columnNumber={2} close={close}/>} />
          <HeaderCell header={ label } columnNumber={3} menu={ ValueHeaderMenu } />
        </Table.Head>
        <Table.VirtualBody height={640}>
          {items.map(renderRow)}
        </Table.VirtualBody>
      </Table>
  );
}
