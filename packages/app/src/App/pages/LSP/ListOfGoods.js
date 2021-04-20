import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";

import Aux from "../../../hoc/_Aux";

class listofgoods extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/api/shipments")
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  render() {
    const { data } = this.state;
    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">List of goods</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      <th>Shipment id</th>
                      <th>Item</th>
                      <th>Amount</th>
                      <th>Importer</th>
                      <th>Tokenized</th>
                    </tr>
                  </thead>

                  <tbody>
                    {console.log(data)}
                    {data.map(shipment => {
                      console.log(shipment);
                      return shipment.cargo.items.map(item => {
                        return (
                          <tr>
                            <th scope="row">{shipment.id}</th>
                            <td>{item.description}</td>
                            <td>{item.amount}</td>

                            <td>{shipment.owner}</td>
                            <td>{item.tokenized}</td>
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default listofgoods;
