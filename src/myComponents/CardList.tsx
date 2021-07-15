import React, { Component } from "react";

interface State {
  cards: JSX.Element;
}

class CardList extends Component<{}, State>{

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      cards: <div></div>
    }
  }

  setCards(newCards: JSX.Element) {
    this.setState({cards: newCards});
  }

  render() {
    return (
      this.state.cards
    )
  }

}

export default CardList;