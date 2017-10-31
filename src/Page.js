import React from 'react';
import Repositories from './Repositories';
import debounceProps from './hoc/debounceProps';

const DebouncesRepositories = debounceProps(Repositories, 300);
export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  get queryString() {
    return `${this.state.searchText} in:name`;
  }

  render() {
    return (
      <div className="page">
        <input
          onChange={e => this.setState({ searchText: e.target.value })}
          value={this.state.searchText}
        />
        <DebouncesRepositories queryString={this.state.searchText} />
      </div>
    );
  }
}
