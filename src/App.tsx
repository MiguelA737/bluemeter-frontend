import React from "react";
import Routes from "./routes";
import { Navbar } from "react-bootstrap";

class App extends React.Component<{}, {}> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/"><h2>Bluemeter</h2></Navbar.Brand>
          </Navbar>
        </div>
        <Routes />
      </div>
    )
  }

}


export default App;