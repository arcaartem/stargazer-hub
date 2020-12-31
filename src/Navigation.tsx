import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Pane,
  TabNavigation,
  Tab
} from 'evergreen-ui';

export default function Navigation() {
  const [selectedTab, setSelectedTab] = useState('home');

  const routes = [
    { key: 'home', to: '/', text: 'Home' },
    { key: 'stars', to: '/stars', text: 'Stars' },
    { key: 'advanced-table', to: '/advanced-table', text: 'Advanced Table' },
    { key: 'somewhere', to: '/somewhere', text: 'Somewhere new' },

  ];

  const navLinks = routes.map(route => {
    return (
        <NavLink to={route.to} isActive={(match, _location) => {
          if (match) {
            setSelectedTab(route.key);
            return true;
          }

          return false;
        }}>
          <Tab key={route.key} id={route.key} isSelected={selectedTab === route.key}>
            {route.text}
          </Tab>
        </NavLink>
    );
  });

  return (
    <Pane background="blueTint" borderRadius={4}>
      <TabNavigation>
        {navLinks}
      </TabNavigation>
    </Pane>
  );
}

