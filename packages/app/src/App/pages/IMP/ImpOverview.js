import React from 'react';
import { Row, Col, Card, Table, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";

class overviewitems extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', jsondata: [], requestedShipment: '' };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch('http://localhost:3001/api/shipments')
            .then(response => response.json())
            .then(data => this.setState({ jsondata: data }));
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        const { name, value } = event.target;
        console.log(this.state.requestedShipment);
        if (name === 'repay') {
            fetch(`http://localhost:3001/api/offers/${this.state.requestedShipment}/repay`, {
                method: 'PUT',
            });
        }
        if (name === 'release') {
            fetch(`http://localhost:3001/api/shipments/${this.state.requestedShipment}/requestRelease`, {
                method: 'PUT',
                body: this.state.requestedShipment,
            }
            )
                ;
        }

    }
    render() {
        return (
            < Aux >
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Overview of items</Card.Title>
                            </Card.Header>
                            <Card.Body>
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
                                            console.log(shipment)
                                            return (
                                                shipment.cargo.items.map((items, index) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{shipment.id}</th>
                                                            <td>{items.description}</td>
                                                            <td>{items.amount}</td>
                                                            {(index === 0) ?
                                                                <td>< Button type="submit" name={items.tokenized ? "repay" : "release"} onClick={() => this.setState({ requestedShipment: shipment.id })} disabled={items.releaseable === "false" ? true : false} variant={items.releaseable === "false" ? "secondary" : "primary"}>{(items.tokenized === "true") ? "Repay" : "Release"}</Button></td> : ""}
                                                        </tr>
                                                    )
                                                }
                                                )
                                            )
                                        }

                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux >
        );
    }
}

export default overviewitems;