import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card,
  TabNavigation,
  Tab
} from 'evergreen-ui';

export default function Navigation() {
  const [selectedTab, setSelectedTab] = useState('home');

  const routes = [
    { key: 'home', path: '/', text: 'Home' },
    { key: 'stars', path: '/stars', text: 'Stars' },
    { key: 'advanced-table', path: '/advanced-table', text: 'Advanced Table' },
    { key: 'somewhere', path: '/somewhere', text: 'Somewhere new' },

  ];

  const navLinks = routes.map(route => {
    return (
      <Tab key={route.key} id={route.key} isSelected={selectedTab === route.key} onSelect={() => setSelectedTab(route.key)}>
        <Link to={route.path}>{route.text}</Link>
      </Tab>
    );
  });

  return (
    <Card background="blueTint">
      <TabNavigation>
        {navLinks}
      </TabNavigation>
    </Card>
  );
}

