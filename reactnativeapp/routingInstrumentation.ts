import * as Sentry from '@sentry/react-native';

const routingInstrumentation = new Sentry.ReactNavigationV5Instrumentation();
export default routingInstrumentation;
