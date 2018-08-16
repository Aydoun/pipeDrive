import { configure } from '@storybook/react';
require('../node_modules/antd/dist/antd.min.css');

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
