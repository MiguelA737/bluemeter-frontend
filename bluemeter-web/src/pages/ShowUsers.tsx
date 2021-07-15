import React from 'react';
import Cookies from 'universal-cookie';
import api from "../services/api";
import CardList from "../myComponents/CardList";
import { Button, Card } from "react-bootstrap";

interface State {
  company: any,
  pricing: number,
  companyUsers: any[],
  user: any,
  hydrometer: any
}

class ShowUsers extends React.Component<{}, State> {
  private cardListElement: React.RefObject<CardList>;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      company: null,
      pricing: 0,
      companyUsers: [],
      user: null,
      hydrometer: null
    };

    this.editPricing = this.editPricing.bind(this);
    this.cardListElement = React.createRef();
  }

  componentDidMount() {
    const cookies = new Cookies();
    const company_id = cookies.get('company_id');

    let cards: any = [];

    this.getCompany(company_id)
      .then(() => {
        this.state.companyUsers.map((item, key) => {
          this.getUser(item)
            .then(() => {
              let user: any = this.state.user;

              this.getHydrometer(user.hydrometer)
                .then(() => {
                  let hydrometer: any = this.state.hydrometer;
                  let date: any = new Date(hydrometer.history[hydrometer.history.length - 1].datetime);
                  cards.push(<div key={key}>
                    <Card>
                      <Card.Title>{user.name}</Card.Title>
                      <Card.Text>Último registro: {date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()}, às {date.getHours() + "h" + date.getMinutes() + "min"}</Card.Text>
                      <Card.Text>Vazão detectada: {hydrometer.history[hydrometer.history.length - 1].flow + "L/min"}</Card.Text>
                    </Card>
                  </div>);

                  this?.cardListElement?.current?.setCards(cards);
                });

            });

        });

      });

  }

  async getCompany(id: string) {
    const headers = {
      'Access-Control-Allow-Origin': '*'
    }

    let dataCompany: any = null;
    let dataUsers: any[] = [];
    let dataPricing: number = 0;

    await api.get("/company?id=" + id,
      {
        headers: headers
      })
      .then(function (res) {
        dataCompany = res.data;
        dataUsers = res.data.users;
        dataPricing = res.data.pricing;
      })

    this.setState({ company: dataCompany, companyUsers: dataUsers, pricing: dataPricing });
  }

  async getUser(id: string) {
    const headers = {
      'Access-Control-Allow-Origin': '*'
    }

    let user: any = null;

    await api.get("/user?id=" + id,
      {
        headers: headers
      })
      .then(function (res) {
        user = res.data;
      })

    this.setState({ user: user });
  }

  async getHydrometer(id: string) {
    const headers = {
      'Access-Control-Allow-Origin': '*'
    }

    let hydrometer: any = null;

    await api.get("/hydrometer?id=" + id,
      {
        headers: headers
      })
      .then(function (res) {
        hydrometer = res.data;
      })

    this.setState({ hydrometer: hydrometer });
  }

  async editPricing() {
    const headers = {
      'Access-Control-Allow-Origin': '*'
    }

    await api.post("/company/update-pricing",
      {
        "id": this.state.company._id,
        "pricing": this.state.pricing
      },
      {
        headers: headers
      })
      .then(function (res) {
        alert("Preço por volume de água atualizado!");
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <div>
        <div>
          <h4>Editar preço por volume de água: </h4>
          <span>R$</span><input id="inputPricing" value={(this.state.pricing).toString()} onChange={(e => {this.setState({pricing: Number(e.target.value)});})}></input>
          <Button id="buttonPricing" style={{display:"inline", marginLeft:"10px"}} onClick={this.editPricing}>Editar</Button>
        </div>
        <br />
        <br />
        <div>
          <h4>Usuários</h4>
          <br />
          <CardList ref={this.cardListElement} />
          <br />
        </div>
      </div>
    )
  }
}

export default ShowUsers;