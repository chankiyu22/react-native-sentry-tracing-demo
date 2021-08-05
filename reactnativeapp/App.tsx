/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useCallback} from 'react';
import Details from './Details';
import Home from './Home';
import routingInstrumentation from './routingInstrumentation';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: 'https://shopping-uatzyx.theclub.com.hk/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const navigationRef = React.useRef<NavigationContainerRef<{}>>(null);

  const onNavigationReady = useCallback(() => {
    routingInstrumentation.registerNavigationContainer(navigationRef);
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
