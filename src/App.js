import React from 'react';
import LoginForm from './LoginForm';
import Page from './Page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: !!window.token
    };
  }

  render() {
    return (
      <div>
        {this.state.authorized ? <Page /> :
          <LoginForm
            onSubmit={token => {
              window.token = token;
              this.setState({ authorized: true });
            }}
          />
        }
      </div>
    );
  }
}
