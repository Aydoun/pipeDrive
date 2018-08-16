import React from 'react';
import { storiesOf } from '@storybook/react';
import Item from '../components/listItem/';


storiesOf('List Box', module)
  .add('User List Item', () => (
    <div>
      <Item 
        userName="Nadia Boulanger"
        userLocation="Fountain Blue, France"
        userInitials="NB"
      />
      <Item />
    </div>
  ));
