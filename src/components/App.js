import React, { useState, Suspense } from "react";

import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';
import RelayEnvironment from '../utils/RelayEnvironment';
import { graphql } from 'react-relay'

import { FilmList } from './FilmList'

// Define a query
const AllFilmsQuery = graphql`
    query AppAllFilmsQuery {
        allFilms {
            totalCount
            edges {
                node {
                    ...FilmListComponent_films
                }
            }
        }
    }
`

const preloadedQuery = loadQuery(RelayEnvironment, AllFilmsQuery, {
  /* query variables */
});

export const App = (props) => {
  const data = usePreloadedQuery(AllFilmsQuery, props.preloadedQuery);
  const [count, setCount] = useState(0);

  return (
    <section>
      <h1>Home</h1>

      <h2>Counter app</h2>

      <div>
        <button style={{ width: 30 }} onClick={() => setCount(count - 1)}>
          -
        </button>
        <output style={{ padding: 10 }}>Count: {count}</output>
        <button style={{ width: 30 }} onClick={() => setCount(count + 1)}>
          +
        </button>
      </div>

      <h2>Relay example</h2>

      <FilmList films={data.allFilms.edges.map(({node}) => node)} />
    </section>
  );
};

export const AppRoot = (props) => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
