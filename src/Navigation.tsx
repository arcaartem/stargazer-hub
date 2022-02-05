import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from './routeDefinitions';

import { 
  Card,
  TabNavigation,
  Tab,
  Text
} from 'evergreen-ui';

type RouteType = { route: keyof typeof routes };

export default function Navigation() {
  const [selectedTab, setSelectedTab] = useState('home');
  const navigate = useNavigate();

  function handleOnSelect(route: any, path: string) {
    setSelectedTab(route);
    navigate(path);
  }
  const NavLink = ({ route }: RouteType) => {
    const { path, text } = routes[route];
    return (
      <Tab
        key={route}
        isSelected={selectedTab === route}
        onSelect={() => handleOnSelect(route, path)}
      >
        <Text>{text}</Text>
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

