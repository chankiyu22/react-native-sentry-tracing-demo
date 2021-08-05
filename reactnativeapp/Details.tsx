import * as Sentry from '@sentry/react-native';
import {withProfiler} from '@sentry/react';
import React from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {gql, useApolloClient} from '@apollo/client';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CATEGORY_ATTRIBUTES = `
id
name
iconUrl: category_thumbnail
thumbnailUrl: category_app_menu_image
includeInMenu: include_in_menu
position
backgroundColor1: background_color_1
backgroundColor2: background_color_2
displayMode: display_mode
landingPage: landing_page
`;

const CATEGORY_QUERY = `
${CATEGORY_ATTRIBUTES}
children {
  ${CATEGORY_ATTRIBUTES}
  children {
    ${CATEGORY_ATTRIBUTES}
    children {
      ${CATEGORY_ATTRIBUTES}
    }
  }
}
`;

const Details: React.FC = () => {
  const client = useApolloClient();

  useEffect(() => {
    const transaction = Sentry.startTransaction({
      name: 'test-get-category-tree',
    });
    let span = transaction.startChild({
      op: 'getCategoryTree',
    });
    client
      .query<unknown, {categoryId: string}>({
        query: gql`
          query QueryCategoryList($categoryId: String) {
            categoryList(filters: { ids: { eq: $categoryId } }) {
              ${CATEGORY_QUERY}
            }
          }
        `,
        variables: {
          categoryId: '2',
        },
        fetchPolicy: 'cache-only',
      })
      .then(result => {
        console.log(JSON.stringify({result}).length);
      })
      .finally(() => {
        span.finish();
        transaction.finish();
      });
  }, [client]);

  useEffect(() => {
    const transaction = Sentry.startTransaction({
      name: 'test-fetch-category-tree',
    });
    let span = transaction.startChild({
      op: 'fetchCategoryTree',
    });
    client
      .query<unknown, {categoryId: string}>({
        query: gql`
          query QueryCategoryList($categoryId: String) {
            categoryList(filters: { ids: { eq: $categoryId } }) {
              ${CATEGORY_QUERY}
            }
          }
        `,
        variables: {
          categoryId: '2',
        },
        fetchPolicy: 'network-only',
      })
      .then(result => {
        console.log(JSON.stringify({result}).length);
      })
      .finally(() => {
        span.finish();
        transaction.finish();
      });
  }, [client]);

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
