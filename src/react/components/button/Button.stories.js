import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

storiesOf('generic|Button', module)
  .add('with text', () => (
    <Button onClick={action('onClick')}>Hello</Button>
  ));
