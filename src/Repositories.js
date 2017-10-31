import React from 'react';
import { graphql } from 'react-apollo';
import REPOSITORY_QUERY from './graphql/Repositories';
import Repository from './Repository';

function getRepositories(params) {
  const targets = params.search && params.search.edges || [];
  const repositories = targets.map((v)  => {
    if (v && v.node && v.node.__typename === 'Repository') {
        return v.node;
      }
      return null;
    });
  return repositories;
}

function getLastCursor(params) {
  const targets = params.search && params.search.edges || [];
  const lastEdge = targets[targets.length -1];
  return lastEdge && lastEdge.cursor || '';
}

function Repositories(props) {
  if (props.error) {
    console.log(props.error);
    return <span>Error</span>
  }
  if (!props.searchResult.search && props.loading) {
    return <span>Loading</span>;
  }
  const { searchResult, loadNextPage } = props;
  const repos = searchResult.search.edges
    .map(v => v.node)
    .map(v => <Repository key={v.id} repository={v} />);
  return (
    <div>
      <div>{repos}</div>
      { repos.length > 1 &&
        <button onClick={e => loadNextPage(getLastCursor(searchResult)) }>more</button>
      }
    </div>
  );
}


const withData = graphql(REPOSITORY_QUERY, ({
  options: ({ queryString }) => (
    {
      variables: { queryString },
      notifyOnNetworkStatusChange: true
    }
  ),
  props: (props) => {
    const { loading, search, fetchMore, error } = props.data;
    return {
      loading,
      error,
      searchResult: { search },
      loadNextPage: (cursor) => {
        return fetchMore({
          variables: { cursor },
          updateQuery: (prev, data) => {
            const { search } = data.fetchMoreResult;
            search.edges = prev.search.edges.concat(search.edges);
            return { search };
          }
        })
      }
    }
  }
}));

export default withData(Repositories);
