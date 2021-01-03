import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routes from './routeDefinitions';

import { 
  Card,
  TabNavigation,
  Tab
} from 'evergreen-ui';

type RouteType = { route: keyof typeof routes };

export default function Navigation() {
  const [selectedTab, setSelectedTab] = useState('home');

  const NavLink = ({ route }: RouteType) => {
    const { path, text } = routes[route];
    return (
      <Tab
        key={route}
        id={route}
        isSelected={selectedTab === route}
        onSelect={() => setSelectedTab(route)}
      >
        <Link to={ path }>{ text }</Link>
      </Tab>
    );
  }

  return (
    <Card background="blueTint">
      <TabNavigation>
        <NavLink route='home' />
        <NavLink route='stars' />
      </TabNavigation>
    </Card>
  );
}

