import React from "react";
import { Row, Col, Card, Table, Button, Form } from "react-bootstrap";

import Aux from "../../../hoc/_Aux";

class impoverviewdeal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      id: 0,
      name: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:3001/api/offers")
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    const { name, value } = event.target;
    console.log(name);
    console.log(this.state.id);
    console.log(this.state.name);
    if (this.state.name === "takedeal") {
      fetch(`http://localhost:3001/api/offers/${this.state.id}/accept`, {
        method: "PUT"
      });
      alert("Accepted offer");
    }
    if (this.state.name === "repay") {
      fetch(`http://localhost:3001/api/offers/${this.state.id}/repay`, {
        method: "PUT"
      });
    }
  }

  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Overview of deals</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Table responsive hover striped>
                    <thead>
                      <tr>
                        <th>Deal</th>
                        <th>Financer</th>
                        <th>Price</th>
                        <th>Buyback</th>
                        <th>Accepted</th>
                        <th>Repay</th>
                      </tr>
                    </thead>

                    <tbody>
                      {console.log(this.state.data)}
                      {this.state.data.map((offer, index) => {
                        console.log(offer);
                        return (
                          <tr>
                            <th scope="row">{offer.id}</th>
                            <td>{offer.financer}</td>
                            <td>{Math.round(100 * offer.price) / 100}</td>
                            <td>{Math.round(100 * offer.buyback) / 100}</td>
                            <td>{offer.financer ? "Yes" : "No"}</td>
                            <td>
                              {offer.financer ? (
                                <Button
                                  type="submit"
                                  name="repay"
                                  onClick={() => this.setState({ id: offer.id, name: "repay" })}
                                  variant="primary"
                                >
                                  Repay
                                </Button>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default impoverviewdeal;
