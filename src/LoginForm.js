import React from 'react';

export default class LoginForm extends React.Component {
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
