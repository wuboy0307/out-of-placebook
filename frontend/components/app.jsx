import React from 'react';
import NavBar from './nav_bar/nav_bar';
import Home from './home/home';

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
