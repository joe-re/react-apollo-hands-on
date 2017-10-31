import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: '' }
  }
  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.props.onSubmit(this.state.token);
          this.setState({ token: '' });
        }}
      >
        <input
          value={this.state.token}
          onChange={e => this.setState({ token: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

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
        {this.state.authorized ? null :
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
