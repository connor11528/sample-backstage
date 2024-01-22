import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { samplePluginPlugin, SamplePluginPage } from '../src/plugin';

createDevApp()
  .registerPlugin(samplePluginPlugin)
  .addPage({
    element: <SamplePluginPage />,
    title: 'Root Page',
    path: '/sample-plugin'
  })
  .render();
