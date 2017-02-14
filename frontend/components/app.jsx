import React from 'react';


class App extends React.Component {
  render() {
    return(
      <div>
        <div className="header-container">
          <div className="header">
            <div className="logo">OOPBook</div>
              {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
