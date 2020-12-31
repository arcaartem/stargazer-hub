import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { 
  Pane,
  TabNavigation,
  Tab
} from 'evergreen-ui';

export default function Navigation() {
  const history = useHistory();
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleHome() {
    setSelectedIndex(0);
    history.push('/');
  }

  function handleAdvancedTable() {
    setSelectedIndex(1);
    history.push('/advanced-table');
  }

  function handleStars() {
    setSelectedIndex(2);
    history.push('/stars');
  }

  return (
    <Pane background="blueTint" borderRadius={4}>
      <TabNavigation>
        <Tab key="Home" id="Home" isSelected={selectedIndex==0} onSelect={handleHome}>
          Home
        </Tab>
        <Tab key="AdvancedTable" id="AdvancedTable" isSelected={selectedIndex==1} onSelect={handleAdvancedTable}>
          Advanced Table
        </Tab>
        <Tab key="Stars" id="Stars" isSelected={selectedIndex==2} onSelect={handleStars}>
          Stars
        </Tab>
      </TabNavigation>
    </Pane>
  );
}

