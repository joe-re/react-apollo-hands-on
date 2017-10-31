import React from 'react';

export default function Repository(props) {
  const { repository } = props;
  return (
    <div className="repository">
      <div>{repository.owner.login}/{repository.name}</div>
    </div>
  );
}
