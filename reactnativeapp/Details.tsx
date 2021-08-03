import * as Sentry from '@sentry/react-native';
import {withProfiler} from '@sentry/react';
import React from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Details: React.FC = () => {
  useEffect(() => {
    const transaction = Sentry.getCurrentHub().getScope()?.getTransaction();
    let span: any = null;
    if (transaction) {
      span = transaction.startChild({
        op: 'getDetailsXhr',
        description: 'Get Details XHR',
      });
    }
    fetch('http://localhost:3001').then(() => {
      console.log('Complete');
      if (span) {
        span.finish();
      }
    });
  }, []);

  useEffect(() => {
    const transaction = Sentry.startTransaction({name: 'test-transaction'});
    const span = transaction.startChild({op: 'functionX'});
    setTimeout(() => {
      span.finish();
      transaction.finish();
    }, 500);
  }, []);

  return (
    <View style={styles.view}>
      <Text>Details Screen</Text>
    </View>
  );
};

export default withProfiler(Details);
