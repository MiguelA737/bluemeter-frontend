import React from "react";
import Cookies from 'universal-cookie';
import api from "../services/api";
import CardList from "../myComponents/CardList";
import { Button, Card } from "react-bootstrap";

class SelectCompany extends React.Component<{}, { search: string, data: any[] }> {
  private cardListElement: React.RefObject<CardList>;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      search: "",
      data: []
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.cardListElement = React.createRef();
  }

  async handleSearch() {
    const headers = {
      'Access-Control-Allow-Origin': '*'
    }

    let data: any[] = [];

    await api.get("/company/search?name=" + this.state.search,
    {
      headers: headers
    })
    .then(function(res) {
      data = res.data;
    })

    this.setState({data: data});

    let cards: JSX.Element = <></>;

    cards = <div>
      {this.state.data.map((item, key) => (
        <Card key={key} onClick={() => {this.selectCompany(item._id)}}>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>Preço por volume de água: R${item.pricing}</Card.Text>
          <Card.Text>Clientes: {item.users.length}</Card.Text>
        </Card>
      ))}
      </div>

    this?.cardListElement?.current?.setCards(cards);
  }

  selectCompany(_id: string) {
    const cookies = new Cookies();

    let d = new Date();
    d.setHours(d.getHours() + 3);

    cookies.set('company_id', _id, { path: "/", expires: d });

    window.location.href = "/showUsers";
  }

  render() {
    return (
    <div>
        <div>
            <br/>
            <span>Digite o nome da companhia: </span>
            <input id="inputSearch" onChange={(e => {this.setState({search: e.target.value});})}></input>
            <Button id="buttonSearch" style={{display:"inline", marginLeft:"10px"}} onClick={this.handleSearch}>Buscar</Button>
            <br/>
        </div>
        <div>
            <br/>
            <CardList ref={this.cardListElement}/>
            <br/>
        </div>
    </div>
    
    );
  }
}


export default SelectCompany;