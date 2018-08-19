import React from 'react';
import { storiesOf } from '@storybook/react';
import Item from '../components/listItem/';
import UserDetails from '../components/userDetails/';
import DND from '../components/dnd/';

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
  ))
  .add('User Details', () => (
    <div>
      <UserDetails />
    </div>
  ))
  .add('Drag and Drop', () => (
    <div>
      <DND />
    </div>
  ));
