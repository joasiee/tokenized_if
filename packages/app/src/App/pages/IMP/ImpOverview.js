import React from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown
} from "react-bootstrap";

import Aux from "../../../hoc/_Aux";

class overviewitems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", jsondata: [], requestedShipment: "", name: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:3001/api/shipments")
      .then(response => response.json())
      .then(data => this.setState({ jsondata: data }));
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    const { name } = this.state.name;
    console.log(this.state.requestedShipment);
    fetch(`http://localhost:3001/api/shipments/${this.state.requestedShipment}`, {
      method: "DELETE",
      body: this.state.requestedShipment
    }).then(data => {
      console.log(data);
      if (data.status === "error") {
        alert("Cannot release, you are not the current holder of the token");
      } else {
        alert("Shipment successfully released, token burned");
      }
    });
  }
  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Overview of items</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Table responsive hover striped>
                    <thead>
                      <tr>
                        <th>Shipment id</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {console.log(this.state.jsondata)}
                      {this.state.jsondata.map(shipment => {
                        console.log(shipment);
                        return shipment.cargo.items.map((items, index) => {
                          return (
                            <tr>
                              <th scope="row">{shipment.id}</th>
                              <td>{items.description}</td>
                              <td>{items.amount}</td>
                              <td>
                                <Button
                                  type="submit"
                                  hidden={index !== 0}
                                  name="release"
                                  onClick={() => this.setState({ requestedShipment: shipment.id, name: "release" })}
                                  disabled={items.releaseable === "false" ? true : false}
                                  variant={items.releaseable === "false" ? "secondary" : "primary"}
                                >
                                  Release
                                </Button>
                              </td>
                            </tr>
                          );
                        });
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

export default overviewitems;
