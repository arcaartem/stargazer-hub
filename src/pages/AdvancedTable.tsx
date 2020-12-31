import React, { useState } from 'react';
import { filter } from 'fuzzaldrin-plus'
import {
  Table,
  Popover,
  Position,
  Menu,
  Avatar,
  Text,
  IconButton,
  ArrowUpIcon,
  ArrowDownIcon,
  CaretDownIcon,
  MoreIcon,
  TextDropdownButton
} from 'evergreen-ui'
import profilesRaw from './../profiles.json'

type Profile = {
  lastActivity: string;
  void: string;
  ltv:  string;
  id: string;
  status: string;
  image: string;
  icon: string;
  city: string;
  job: string;
  company: string;
  description: string;
  country: string;
  gender: string;
  firstname: string;
  lastname: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

type OrderState = {
  orderedColumn: number,
  ordering: Order,
}

type StateHook<T> = [T, (value: T) => void];

enum Order {
  NONE = 'NONE',
  ASC = 'ASC',
  DESC = 'DESC'
}

const profiles: Array<Profile> = profilesRaw;

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName];
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

function comparison(a: any, b: any) {
  return a===b ? 0 : (a > b ? 1 : -1);
}

function sortProfiles(profiles: Array<Profile>, ordering: Order, orderedColumn: number, column2Show: string) {
  if (ordering === Order.NONE) return profiles

  let propKey = 'name'
  if (orderedColumn === 2) propKey = column2Show;
  if (orderedColumn === 3) propKey = 'ltv';

  return profiles.sort((a: Profile, b: Profile) => {
    let aValue = getProperty(a, propKey as keyof Profile);
    let bValue = getProperty(b, propKey as keyof Profile);

    const isMoney = aValue.indexOf('$') === 0

    let comparisonResult = isMoney ? comparison(Number(aValue.slice(1)), Number(bValue.slice(1))) : comparison(aValue, bValue);

    return (ordering === Order.ASC) ? comparisonResult : -1 * comparisonResult;
  });
}

function renderRow(profile: Profile, column2Show: keyof Profile) {
  return (
    <Table.Row key={profile.id}>
      <Table.Cell display="flex" alignItems="center">
        <Avatar name={profile.name} />
        <Text marginLeft={8} size={300} fontWeight={500}>
          {profile.name}
        </Text>
      </Table.Cell>
      <Table.TextCell>{getProperty(profile, column2Show)}</Table.TextCell>
      <Table.TextCell isNumber>{profile.ltv}</Table.TextCell>
      <Table.Cell width={48} flex="none">
        <Popover
          content={renderRowMenu}
          position={Position.BOTTOM_RIGHT}
        >
          <IconButton icon={MoreIcon} height={24} appearance="minimal" />
        </Popover>
      </Table.Cell>
    </Table.Row>
  )
}

function renderRowMenu() {
  return (
    <Menu>
      <Menu.Group>
        <Menu.Item>Share...</Menu.Item>
        <Menu.Item>Move...</Menu.Item>
        <Menu.Item>Rename...</Menu.Item>
      </Menu.Group>
      <Menu.Divider />
      <Menu.Group>
        <Menu.Item intent="danger">Delete...</Menu.Item>
      </Menu.Group>
    </Menu>
  );
}

function filterProfiles(profiles: Array<Profile>, searchQuery: string) {
  if (searchQuery.length === 0) return profiles;

  return profiles.filter(profile => {
    const result = filter([profile.name], searchQuery);
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

function renderLTVTableHeaderCellFunction(orderedColumn: number, ordering: Order, setOrderState: (orderState: OrderState) => void) {
  return (
    <Table.TextHeaderCell>
      <Popover
        position={Position.BOTTOM_LEFT}
        content={({ close }) => (
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
                setOrderState({
                  orderedColumn: 3,
                  ordering: value
                });
                close();
              }}
            />
          </Menu>
        )}
      >
        <TextDropdownButton
          icon={
            orderedColumn === 3
              ? getIconForOrder(ordering)
              : CaretDownIcon
          }
        >
          LTV
        </TextDropdownButton>
      </Popover>
    </Table.TextHeaderCell>
  )
}

function renderValueTableHeaderCellFunction(orderedColumn: number, ordering: Order, column2Show: keyof Profile, setOrderState: (orderState: OrderState) => void, setColumn2Show: (column2Show: keyof Profile) => void) {
  return (
    <Table.HeaderCell>
      <Popover
        position={Position.BOTTOM_LEFT}
        content={({ close }) => (
          <Menu>
            <Menu.OptionsGroup
              title="Order"
              options={[
                { label: 'Ascending', value: Order.ASC },
                { label: 'Descending', value: Order.DESC }
              ]}
              selected={
                orderedColumn === 2 ? ordering : null
              }
              onChange={value => {
                setOrderState({ orderedColumn: 2, ordering: value });
                close();
              }}
            />

            <Menu.Divider />

            <Menu.OptionsGroup
              title="Show"
              options={[
                { label: 'Email', value: 'email' },
                { label: 'Phone', value: 'phone' },
                { label: 'Address', value: 'address' },
                { label: 'Country', value: 'country' },
                { label: 'Company', value: 'company' },
                { label: 'Id', value: 'id' }
              ]}
              selected={column2Show}
              onChange={value => { setColumn2Show(value); close(); }}
            />
          </Menu>
        )}
      >
        <TextDropdownButton
          icon={
            orderedColumn === 2 ? getIconForOrder(ordering) : CaretDownIcon
          }
        >
          {capitalize(column2Show)}
        </TextDropdownButton>
      </Popover>
    </Table.HeaderCell>
  )
}

export default function AdvancedTable() {
  const [orderState, setOrderState]: StateHook<OrderState> = useState({ orderedColumn: 1, ordering: Order.NONE } as OrderState);
  const [searchQuery, setSearchQuery]: StateHook<string> = useState('');
  const [column2Show, setColumn2Show]: StateHook<keyof Profile> = useState('email' as keyof Profile);

  const { ordering, orderedColumn } = orderState;

  const sortedProfiles = sortProfiles(profiles, ordering, orderedColumn, column2Show);
  const items = filterProfiles(sortedProfiles, searchQuery.trim());

  return (
    <Table border>
      <Table.Head>
        <Table.SearchHeaderCell
          onChange={setSearchQuery}
          value={searchQuery}
        />
        {renderValueTableHeaderCellFunction(orderedColumn, ordering, column2Show as keyof Profile, setOrderState, setColumn2Show)}
        {renderLTVTableHeaderCellFunction(orderedColumn, ordering, setOrderState)}
        <Table.HeaderCell width={48} flex="none" />
      </Table.Head>
      <Table.VirtualBody height={640}>
        {items.map(item => renderRow(item, column2Show))}
      </Table.VirtualBody>
    </Table>
  )
}
