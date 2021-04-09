import React from 'react';
import { Row, Col, Card, Table, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";

class addshipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            owner: "",
            uuid: "",
            itemd: "",
            itema: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        console.log(event.target.value);
        console.log(event.target.name);
        const { name, value } = event.target;
        console.log(name);
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.requestedShipment);
        const result = { "owner": this.state.owner, "cargo": { "items": [{ "description": this.state.itemd, "amount": this.state.itema }] } };
        console.log(result);
        fetch('http://127.0.0.1:3000/api/shipments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        });
        window.location.reload(false);
    }
    render() {
        const { data } = this.state;
        return (

            < Aux >
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Add shipment</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <h5>Owner information</h5>
                                    <hr />
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormOwnerName">
                                                <Form.Label>Owner name</Form.Label>
                                                <Form.Control type="text" placeholder="name" name="owner" onChange={this.handleInputChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <h5 className="mt-5">Shipment information</h5>
                                    <hr />
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormShipmentUUID">
                                                <Form.Label>Cargo UUID</Form.Label>
                                                <Form.Control type="text" placeholder="UUID" name="uuid" onChange={this.handleInputChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <h5 className="mt-5">Items</h5>
                                    <hr />
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormItemDescription">
                                                <Form.Control type="text" placeholder="description" name="itemd" onChange={this.handleInputChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="FromItemamount">
                                                <Form.Control type="text" placeholder="amount" name="itema" onChange={this.handleInputChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button type="submit">Submit</Button>
                                    {/* <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormItemDescription">
                                                <Form.Control type="text" placeholder="description" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="FromItemamount">
                                                <Form.Control type="text" placeholder="amount" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormItemDescription">
                                                <Form.Control type="text" placeholder="description" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="FromItemamount">
                                                <Form.Control type="text" placeholder="amount" />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormItemDescription">
                                                <Form.Control type="text" placeholder="description" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="FromItemamount">
                                                <Form.Control type="text" placeholder="amount" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormItemDescription">
                                                <Form.Control type="text" placeholder="description" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="FromItemamount">
                                                <Form.Control type="text" placeholder="amount" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="FormItemDescription">
                                                <Form.Control type="text" placeholder="description" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="FromItemamount">
                                                <Form.Control type="text" placeholder="amount" />
                                            </Form.Group>
                                        </Col>
                                    </Row> */}

                                </Form>
                            </Card.Body>
                        </Card>
                    </Col >
                </Row >
            </Aux >
        );
    }
}

export default addshipment;