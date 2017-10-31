import React from 'react';
import ADD_STAR_MUTATION from './graphql/AddStar';
import REMOVE_STAR_MUTATION from './graphql/RemoveStar';
import { graphql, compose } from 'react-apollo';

function Repository(props) {
  const { addStar, removeStar, repository } = props;
  return (
    <div className="repository" style={{margin: '16px'}}>
      <div>{repository.owner.login}/{repository.name}</div>
      {repository.viewerHasStarred ?
        <button onClick={() => removeStar(repository.id)}>remove star</button> :
        <button onClick={() => addStar(repository.id)}>add star</button>
      }
    </div>
  );
}

const RepositoryWithMutations = compose(
  graphql(ADD_STAR_MUTATION, {
    props: ({ ownProps, mutate }) => ({
      addStar: (id: string) =>
        mutate({ variables: { input: { starrableId: id } }, })
    })
  }),
  graphql(REMOVE_STAR_MUTATION, {
    props: ({ ownProps, mutate }) => ({
      removeStar: (id: string) =>
        mutate({ variables: { input: { starrableId: id } }, })
    })
  })
)(Repository);

export default RepositoryWithMutations;
