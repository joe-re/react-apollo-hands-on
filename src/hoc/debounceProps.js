// @flow

import React from 'react';
import debounce from 'lodash/debounce';

export default function debaunceProps( WrappedComponent, debounceCount, debounceOption) {
  return class DeabounceProps extends React.Component {
    constructor(props) {
      super(props);
      this.state = props;
      this.debouncedSetState = debounce(this.setState, debounceCount, debounceOption);
    }

    componentWillReceiveProps(nextProps) {
      this.debouncedSetState(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextState !== this.state;
    }

    render() {
      return <WrappedComponent {...(this.state: any)} />;
    }
  }
}
