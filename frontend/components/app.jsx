import React from 'react';
import NavBar from './nav_bar/nav_bar';

class App extends React.Component {
  render() {
    return(
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
