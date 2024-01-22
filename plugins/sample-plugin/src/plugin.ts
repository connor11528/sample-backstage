import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const samplePluginPlugin = createPlugin({
  id: 'sample-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const SamplePluginPage = samplePluginPlugin.provide(
  createRoutableExtension({
    name: 'SamplePluginPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
