import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

// Create a plugin instance and export this from your plugin package
export const samplePluginPlugin = createPlugin({
  id: 'sample-plugin',
  routes: {
    root: rootRouteRef, // This is where the route ref should be exported for usage in the app
  },
});

// This creates a routable extension, which are typically full pages of content.
// Each extension should also be exported from your plugin package.
export const SamplePluginPage = samplePluginPlugin.provide(
  createRoutableExtension({
    name: 'SamplePluginPage',
    // The component needs to be lazy-loaded. It's what will actually be rendered in the end.
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
      // This binds the extension to this route ref, which allows for routing within and across plugin extensions
      mountPoint: rootRouteRef,
  }),
);
