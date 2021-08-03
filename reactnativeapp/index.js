/**
 * @format
 */

import * as Sentry from '@sentry/react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import routingInstrumentation from './routingInstrumentation';

AppRegistry.registerComponent(appName, () => App);

Sentry.init({
  dsn: 'https://14c1836595ae4faabf75907383698fe1@o938854.ingest.sentry.io/5890077',
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
      // ... other options
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
